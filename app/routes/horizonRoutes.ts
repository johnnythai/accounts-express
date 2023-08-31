const express = require('express');
const horizonRouter = express.Router();
const cookiesMiddleware = require('universal-cookie-express');

horizonRouter.get('/', (req, res) => {
	res.status(200).send('horizon route');
});

module.exports = horizonRouter;
