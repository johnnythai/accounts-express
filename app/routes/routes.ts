const express = require('express');
const router = express.Router()

const { fetchFisToken, fetchHorizonToken } = require('../controllers/fetch')

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
			console.log(`${requestedToken} token:`, token);
			res.status(200).send(token);
		} else if (requestedToken === 'horizon') {
			const token = await fetchHorizonToken(req);
			// console.log(`${requestedToken} token:`, token);
			res.status(200).send(token);
		}
	} catch (error) {
		console.error('Authorization error:', error);
		res.status(500).send('Error fetching token');	
	};
});

module.exports = router;
