const express = require('express');
const app = express();
const port = 4001;

require('dotenv').config();
const CONSUMER_KEY = process.env.CONSUMER_KEY
const CONSUMER_SECRET = process.env.CONSUMER_SECRET

const jwt = require('jsonwebtoken');

// Define a basic route
app.get('/', (req, res) => {
  res.send('accounts-express app for FIS HORIZON API');
});

// Access token
app.get('/access-token', (req, res) => {
	const token = fetchAccessToken()
	console.log(token)
	res.send('token')
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const fetchAccessToken = () => {
	const apiUrl = 'https://api-gw-uat.fisglobal.com/token';

	const base64Credentials = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
	const requestBody = 'grant_type=client_credentials';

	console.log('base64Credentials:', base64Credentials)
	console.log('requestBody:', requestBody)

	fetch(apiUrl, {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${base64Credentials}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: requestBody,
	})
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error))
}
