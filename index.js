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

// express-middleware:
// app.use -> attach middleware: small functions to be called before sending to route handler app.get....

// cookieSession:
// takes data out of cookie and assigns to req.session
// req.session: passport: {user: user._id} // stores user id
// passports access data on rec.session

// express does not reccomend cookie-session they recommend express-session
// express-session: cookie stores reference to a session then looks up data from session-store > figure out who user is : session-store w/ session id -> returns user model
// -- trys to store all data outside cookie
// -- can store large amounts of data

// cookie-session: the cookie is the session > reference to user id
// -- store all data on cookie
// -- can only store small amount of data
