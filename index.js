const express = require('express');
require('./services/passport'); // make sure passport is ran...

const app = express();

require('./routes/authRoutes')(app); // bring in authRoutes function and call it with app

const PORT = process.env.PORT || 5000;
app.listen(PORT, err => {
	if (err) {
		console.log('server error', err);
	} else {
		console.log('listening on port', PORT);
	}
});
