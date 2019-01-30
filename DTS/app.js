const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const mustache = require('mustache');
const mustache_express = require('mustache-express');

const app = express();
const router = express.Router();

var currUser = "";

// MongoDB UserData
require('./models/UserData');
const UserData = mongoose.model('Users');

// MongoDB BugData
require('./models/BugData');
const BugData = mongoose.model('Bugs');

const port = 5000;

// View Engine
app.engine('mustache', mustache_express());
app.set('view engine', 'mustache');

app.set('views', path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));

// Connect To MongoDB
mongoose.connect("mongodb://localhost:27017/dts", {
	useNewUrlParser: true
}).then(function () {
	console.log("MongoDB Connected");
}).catch(function (err) {
	console.log(err);
});

// Routes
router.get('/', (req, res) => {
	//res.sendFile(path.join(__dirname, '/index.html'));
	res.render('index', {PAGE:"<h3>MUSTACHE</h3>"});
});

router.get('/search', (req, res) => {
	if (req.query.user != undefined) {
		res.render('index', { QUERY: "user=" + req.query.user });
	} else {
		res.render('index', { PAGE: "<h3>MUSTACHE</h3>" });
	}
});

router.get('/input', (req, res) => {

	var project = req.query.project;
	var bugName = req.query.bug_name;
	var bugType = req.query.bug_type;
	var bugLevel = req.query.bug_level;
	var os = req.query.os;
	var platform = req.query.platform;
	var envExtra = req.query.env_extra;
	var description = req.query.description;
	var steps = req.query.steps;

	if (project != undefined && bugName != undefined && bugType != undefined && bugLevel != undefined && os != undefined && platform != undefined && envExtra != undefined && description != undefined && steps != undefined) {

		var newEntry = {
			project: project,
			name: bugName,
			type: bugType,
			status: "open",
			enviornment: {
				os: os,
				platform: platform,
				extra: envExtra
			},
			description: description,
			steps: steps
		};
		
		new BugData(newEntry).save().then(function (entry) {
			console.log(JSON.stringify(entry));
			res.redirect('/login?user=' + entry.reporter);
		}).catch((err) => {
			console.log(err);
		});

	} else if (req.query.user != undefined) {
		if (currUser == "") currUser = req.query.user;
		res.render('addbug', { QUERY: "user=" + req.query.user });
	} else {
		res.redirect('/login');
	}
});

router.get('/login', (req, res) => {
	var email = req.query.email;
	var password = req.query.password;
	var user = req.query.user;
	if (email != undefined && password != undefined) {
		UserData.findOne({email: email}).then(function (found) {
			if (found != undefined && Encrypt(password, email) == found.password) res.redirect('/login?user=' + found.id);
			else res.redirect('/login');
		});
	} else if (user != undefined) {
		res.render('index', { QUERY: "user=" + user });
		currUser = user;
	} else {
		res.render('login', { PAGE: "<h3>MUSTACHE</h3>" });
	}
});

router.get('/signup', (req, res) => {
	var email = req.query.email;
	var password = req.query.password;
	var passwordRepeat = req.query.password2;
	var firstName = req.query.first_name;
	var lastName = req.query.last_name;
	if (email != undefined && password != undefined && passwordRepeat != undefined && firstName != undefined && lastName != undefined) {
		
		if (passwordRepeat == password) {
			var newEntry = {
				email: email,
				first_name: firstName,
				last_name: lastName,
				password: Encrypt(password, email),
				admin: true
			};
			
			new UserData(newEntry).save().then(function (entry) {
				res.redirect('/login?user=' + entry.id);
			});
		}
		
	} else {
		res.render('signup', { PAGE: "<h3>MUSTACHE</h3>" });
	}
});

// Send Bug Count
app.get('/bugcount', function (req, res) {
	console.log("REQUEST MADE FROM FETCH");
	res.send({ major_count: 50, minor_count: 30, nth_count: 20});
});

// Send Bug Form Info
app.get('/initbugform', function (req, res) {
	console.log("REQUEST MADE FROM FETCH");
	console.log(req.query.user);
	res.send({ projects: [{name:"DTS"}], user: currUser });
});

// Start Server
app.use('/', router);
app.listen(port, () => {
	console.log("Server is running on port " + port.toString());
});

// Helper Functions
function Encrypt(rawPassword, key) {
	var newPassword;
	var length = Math.max(rawPassword.length, key.length)
	for (i = 0; i < length; i++) {
		newPassword += String.fromCharCode(rawPassword.charCodeAt(i % rawPassword.length) + key.charCodeAt(i % key.length));
	}
	return newPassword;
}
