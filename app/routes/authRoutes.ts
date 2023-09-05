const express = require('express');
const authRouter = express.Router();
const cookiesMiddleware = require('universal-cookie-express');

const { fetchFisToken, fetchHorizonToken } = require('../controllers/fetch')

// CookiesMiddleware to check for Authentication Token on /fis

// CookiesMiddleware to check for Authentication Token + FIS Token on /horizon

// Home 
authRouter.get('/', (req: any, res: any) => {
	res.status(200).send('authorization endpoint');
});


// FIS Token
authRouter.get('/fis', async (req, res) => {
	console.log('FIS TOKEN REQUESTED');
	
	try {
		const fisToken = await fetchFisToken(req);
		res.status(200).send(fisToken);
	} catch {
		console.error('Authorization error:', error);
		res.status(500).send('Authorization Error');
	}
});

// Horizon Token
authRouter.get('/horizon', async (req, res) => {
	console.log('HORIZON TOKEN REQUESTED');

	try {
	} catch {
		console.error('Authorization error: ', error);
		res.status(500).send('Authorization Error');
	}
});

module.exports = authRouter;
