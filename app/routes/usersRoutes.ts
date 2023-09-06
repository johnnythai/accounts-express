const express = require('express');
const usersRouter = express.Router();
const usersController = require('../controllers/usersController');

require('dotenv').config();

usersRouter.get('/', (req, res) => {
	res.status(200).send('users endpoint');
});

// usersRouter.post('/register', usersController.register); 

usersRouter.post('/login', usersController.login);
		 
module.exports = usersRouter;
