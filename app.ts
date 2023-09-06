const express = require('express');
const app = express();
const cors = require('cors');
const port = 4001;

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
		'http://localhost:3000',
	]	
};
app.use(cors(corsOptions));

// Authentication
app.use('/users', usersRouter);

// Authorization
app.use('/authorization', authRouter);

// Horizon
app.use('/horizon', horizonRouter);


//Home
app.get('/', (req, res) => {
	res.status(200).send('accounts-express app home for FIS HORIZON API');
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

// module.exports = dbConnection;
