const http = require('http');
const path = require('path');
const express = require('express');
const mustache = require('mustache');
const mustache_express = require('mustache-express');

const app = express();
const router = express.Router();

const port = 5000;

app.set("view engine", "http");

app.use(express.static(path.join(__dirname, "/views")));
app.use(express.static(path.join(__dirname, "/public")));



router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/index.html'));
});

router.get('/search', (req, res) => {
	
});

router.get('/input', (req, res) => {
	console.log("");
});

router.get('/login', (req, res) => {
	
});

router.get('/signup', (req, res) => {
	
});

app.use('/', router);
app.listen(port, () => {
	console.log("Server is running on port " + port.toString());
});
