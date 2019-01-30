const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({

	email:{
		type: String,
		required: true
	},
	first_name: {
		type: String,
		required: true
	},
	last_name: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		required: true
	}

});

mongoose.model('Users', UserSchema);