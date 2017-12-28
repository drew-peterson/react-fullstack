const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	_oAuthId: {
		type: String
	}
});

mongoose.model('user', userSchema);
