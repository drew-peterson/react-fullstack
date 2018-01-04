const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url'); // default in node.js

const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/SurveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
	// check if user is loggeed in + has enough credits
	// middleWare order matters
	// have to mark as async to handle async below....
	app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
		const { title, subject, body, recipients } = req.body;

		const survey = new Survey({
			title,
			subject,
			body,
			recipients: recipients
				.split(',')
				.map(email => ({ email: email.trim() })), // 1 line return object must wrap in () --> ({object})
			_user: req.user.id,
			dateSent: Date.now()
		});
		// SEND EMAIL
		const mailer = new Mailer(survey, surveyTemplate(survey));
		try {
			await mailer.send();
			await survey.save();
			req.user.credits -= 1;
			const user = await req.user.save(); // req.user is outdated after save so we save new user...
			res.send(user); // update redux
		} catch (error) {
			res.status(422).send({ error });
		}
	});

	// /api/* is used in client package.json as proxy so any calls to /api will hit the express api not react router...
	app.get('/api/surveys/:surveyId/:type', (req, res) => {
		res.send('thanks for voting!');
	});

	// SEND GRID webhooks
	app.post('/api/surveys/webhooks', (req, res) => {
		const p = new Path('/api/surveys/:surveyId/:choice'); // match pattern to extract vars..
		// want to remove duplicate and non click events...
		// setup chain for lodash start with _.chain() -- end w/ .value() can remove data to iterate over for each chain
		_.chain(req.body)
			.map(({ email, url }) => {
				// new URL(url).pathname = extract only /api/survey/:id/:choice
				const match = p.test(new URL(url).pathname); // extract vars using pattern and return object or null
				if (match) {
					return {
						email,
						surveyId: match.surveyId,
						choice: match.choice
					};
				}
			})
			.compact() // remove all null or undefined from array
			.uniqBy('email', 'surveyId') // remove objects that match both email + id
			.each(({ surveyId, email, choice }) => {
				Survey.updateOne(
					{
						_id: surveyId, // should probably use _id where i used .id for mongoose...
						recipients: {
							$elemMatch: { email: email, responded: false } // 2 conditions to match so we use this, if one then 'recipeints.email' syntax
						}
					},
					{
						$inc: {
							[choice]: 1
						},
						$set: {
							'recipients.$.responded': true, // $ is the index of the subdocument
							lastResponded: new Date()
						}
					}
				).exec(); // actually call query....
			})
			.value();
		res.status(200).send({});
	});

	// WEBHOOK SENDGRID REQ
	// {
	//    event: 'click',
	//    url_offset: { index: 0, type: 'html' },
	//    email: 'peteand07@gmail.com',
	//    timestamp: 1514920652,
	//    url: 'http://localhost:3000/api/surveys/5a4bdaa32eb8771b46881938/yes' }
	// }

	// app.post('drew.peterson:Peteand07/api/webhook', (req, res) => {
	// 	console.log('**********************');
	// 	console.log('WEB HOOK');
	// 	console.log('**********************');
	// });

	app.get('/api/surveys', requireLogin, async (req, res) => {
		const surveys = await Survey.find({ _user: req.user._id }).select({
			recipients: 0
		}); // need to think about what fields we dont want!!! recipeints is big and not used

		res.send(surveys);
	});

	// delete specific surveys...
	app.delete('/api/surveys/:surveyId', requireLogin, async (req, res) => {
		try {
			const survey = await Survey.findByIdAndRemove(req.params.surveyId);
			res.status(200).send(survey._id);
		} catch (err) {
			res.send({ err });
		}
	});
};
