const express = require('express');
const usersRouter = express.Router();

usersRouter.get('/', (req, res) => {
	res.status(200).send('users endpoint');
});

module.exports = usersRouter;
