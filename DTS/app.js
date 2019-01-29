const fs = require('fs');
const path = require('path');
const express = require('express');
const mustache = require('mustache');
const mustache_express = require('mustache-express');

const app = express();
const router = express.Router();

const port = 5000;

app.engine('mustache', mustache_express());
app.set('view engine', 'mustache');

app.set('views', path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "/public")));



router.get('/', (req, res) => {
	//res.sendFile(path.join(__dirname, '/index.html'));
	res.render('index', {PAGE:"<h3>MUSTACHE</h3>"});
});

router.get('/search', (req, res) => {
	res.render('index', { PAGE: "<h3>MUSTACHE</h3>" });
});

router.get('/input', (req, res) => {
	res.render('index', { PAGE: "<h3>MUSTACHE</h3>" });
});

router.get('/login', (req, res) => {
	var email = req.query.email;
	var password = req.query.password;
	var user = req.query.user;
	if (email != undefined && password != undefined) {
		console.log(encrypt(password, email));
		res.redirect('/login?user=' + email);
	} else if (user != undefined) {
		res.render('index', { USER: user });
	} else {
		res.render('login', { PAGE: "<h3>MUSTACHE</h3>" });
	}
});

router.get('/signup', (req, res) => {
	var email = req.query.email;
	var password = req.query.password;
	var firstName = req.query.first_name;
	var lastName = req.query.last_name;
	if (email != undefined && password != undefined && firstName != undefined && lastName != undefined) {
		res.redirect('/login?user=' + email);
	} else {
		res.render('signup', { PAGE: "<h3>MUSTACHE</h3>" });
	}
});

app.use('/', router);
app.listen(port, () => {
	console.log("Server is running on port " + port.toString());
});

// Helper Functions

function encrypt(rawPassword, key) {
	var newPassword;
	var length = Math.max(rawPassword.length, key.length)
	for (i = 0; i < length; i++) {
		newPassword += String.fromCharCode(rawPassword.charCodeAt(i % rawPassword.length) + key.charCodeAt(i % key.length));
	}
	return newPassword;
}
