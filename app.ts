const express = require('express');
const app = express();
const port = 4001;

const morgan = require('morgan');
app.use(morgan('common'));

const router = require('./app/routes/routes');
const db = require('./db');

// Home
app.use('/', router);

// Authentication
app.use('/login', router);

// Authorization
app.use('/authorization/:token', router);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
	db();
});
