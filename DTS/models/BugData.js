const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var BugSchema = new Schema({

	project: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	type: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	enviornment: {
		hardware: {
			type: String,
			required: false
		},
		os: {
			type: String,
			required: false
		},
		extra: {
			type: String,
			required: false
		}
	},
	discription: {
		type: String,
		required: true
	},
	steps: {
		type: String,
		required: true
	},
	reporter: {
		type: String,
		required: true
	},
	assignee: {
		type: String,
		required: false
	},
	date: {
		type: String,
		default: Date.now
	}

});

mongoose.model('Bugs', BugSchema);