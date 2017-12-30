const keys = require('../config/keys');
const stripe = require('stripe')(keys.STRIPE_SECRET_KEY);
const requireLogin = require('../middlewares/requireLogin');

// add our custom middleware to prevent people not logged in to access route
// you can add more middleWare to each route with , however express says one has to res.send back information to client
module.exports = app => {
	app.post('/api/stripe', requireLogin, async (req, res) => {
		// this is how you handle errors w/ async await
		try {
			const charge = await stripe.charges.create({
				amount: 500,
				currency: 'usd',
				description: '$5 dollars for 5 credits',
				source: req.body.id
			});
			// req.user is the user model so you can save and such....
			req.user.credits += 5;
			const user = await req.user.save();
			res.send(user);
		} catch (error) {
			res.status(422).send({ error });
		}
	});
};
