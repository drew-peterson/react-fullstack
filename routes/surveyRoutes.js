const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

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
	app.get('/api/surveys/thanks', (req, res) => {
		res.send('thanks for voting!');
	});
};
