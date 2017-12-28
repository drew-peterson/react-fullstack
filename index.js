const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

require('./models/User'); // require mongoose models -- model has to exist first before passport can use it
require('./services/passport'); // make sure passport is ran...

mongoose.connect(keys.MONGO_URI);

const app = express();

// use cookies inside app
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000, // cookie lasts 30days in milliseconds,
		keys: [keys.COOKIE_KEY]
	})
);

// tell passport to use cookies...
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // bring in authRoutes function and call it with app

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
	if (err) {
		console.log('server error', err);
	} else {
		console.log('listening on port', PORT);
	}
});
