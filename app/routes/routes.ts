const express = require('express');
const router = express.Router()
const horizonRouter = require('./horizonRoutes');
const cookiesMiddleware = require('universal-cookie-express');

const { fetchFisToken, fetchHorizonToken } = require('../controllers/fetch')

// Middleware
router.use(cookiesMiddleware());

// Check for fisToken before requesting horizonToken
router.use('/authorization/horizon', (req, res) => {
	const fisToken = req.universalCookies.get('fisToken');
	if (!fisToken) {
		return res.status(401)
	};
});

// Check for horizonToken before making requests to HORIZON API
horizonRouter.use((req, res) => {
	const horizonToken = req.universalCookies.get('horizonToken');
	if (!horizonToken) {
		return res.status(401)
	};
});

// Horizon Router
router.use('/horizon', horizonRouter);

// Home 
router.get('/', (req: any, res: any) => {
	res.status(200).send('accounts-express app for FIS HORIZON API');
});

// Authentication


// Authorization tokens
router.get('/authorization/:token', async (req, res) => {
	const requestedToken = req.params.token;
	console.log(requestedToken, ' token requested');

	try {
		if (requestedToken === 'fis') {
			const token = await fetchFisToken(req);
			res.status(200).send(token);
		} else if (requestedToken === 'horizon') {
			const token = await fetchHorizonToken(req);
			res.status(200).send(token);
		}
	} catch (error) {
		console.error('Authorization error:', error);
		res.status(500).send('Authorization Error');	
	};
});

module.exports = router;
