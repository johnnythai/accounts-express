const express = require('express');
const app = express();
const port = 4001;

require('dotenv').config();
const CONSUMER_KEY = process.env.CONSUMER_KEY
const CONSUMER_SECRET = process.env.CONSUMER_SECRET

const jwt = require('jsonwebtoken');

// Define a basic route
app.get('/', (req, res) => {
	res.status(200).send('accounts-express app for FIS HORIZON API')
});

// Access token
app.get('/access-token', async (req, res) => {
	try {
		const token = await fetchAccessToken();
		console.log('TOKEN:', token);
		res.status(200).send(token)
	} catch (error) {
		console.error('Access token error:', error);
		res.status(500).send('Error fetching access token');
	}
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});

const fetchAccessToken = async () => {
	const apiUrl = 'https://api-gw-uat.fisglobal.com/token';

	const base64Credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
	const requestBody = 'grant_type=client_credentials';

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'Authorization': `Basic ${base64Credentials}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: requestBody,
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data.access_token; // Return the access token
	} catch (error) {
		console.error('Fetch access token error:', error);
		throw error;
	}
};
