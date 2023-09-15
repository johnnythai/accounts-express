const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config()

const helmet = require('helmet');
const morgan = require('morgan');
app.use(morgan('common'));

const authRouter = require('./app/routes/authRoutes');
const usersRouter = require('./app/routes/usersRoutes');
const horizonRouter = require('./app/routes/horizonRoutes'); 
// const dbConnect = require('./app/models/db');
// const dbConnection = db();

// app.use(helmet());

const corsOptions = {
	origin: [
		'https://johnnythai.dev',
		'https://fis.johnnythai.dev',
		'http://localhost:3001',
	]	
};
app.use(cors(corsOptions));

// Authentication
app.use('/api/users', usersRouter);

// Authorization
app.use('/api/authorization', authRouter);

// Horizon
app.use('/api/horizon', horizonRouter);


//Home
app.get('/', (req, res) => {
	res.status(200).send('accounts-express app home for FIS HORIZON API');
});

// Start the server
app.listen(() => {
	console.log(`Server is running on port ${process.env.PORT}`);
});

// module.exports = dbConnection;
