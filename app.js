const express = require('express');
const app = express();
const port = 4001;

const router = require('./app/routes/routes');

// Home
app.use('/', router);

// Authorization
app.use('/authorization/:token', router);

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});





/*
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


const fetchHorizonToken = async () => {
	const apiUrl = 'https://api-gw-uat.fisglobal.com/rest/horizon/authorization/v2/authorization'

	const id = uuidv4()
	console.log('uuid:', id)

	try {
		const response = await fetch(apiUrl, {
			method: 'POST',
			headers: {
				'accept': 'application/json',
				'organization-id': ORGANIZATION_ID,
				'uuid': id,
				'source-id': SOURCE_ID,
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${access_token}`,
			},
			body: requestBody,
		})
*/
