var express = require('express'),
	feed = require('./app/routes'), // load the routes
	app = express(),
	morgan = require('morgan'),
	bodyParser = require('body-parser');

require('./config/database'); // load the database config

app.use(morgan('dev')); /* 'default','short','tiny','dev' */
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use(express.static(__dirname)); 

// Move to seperate file
app.get('/feeds', feed.findAll);
app.get('/feeds/:id', feed.findById);
app.post('/feeds', feed.addFeed);
app.put('/feeds/:id', feed.updateFeed);
app.delete('/feeds/:id', feed.deleteFeed);

app.listen(3000);
console.log('Listening on port 3000...');