const { fetchApi } = require('./fetch');
require('dotenv').config();

const { v4: uuidv4 } = require('uuid');


const fetchFisToken = async (req: {}, res: any) => {
	const apiUrl = process.env.FIS_API_URL; 
	const base64Creds = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');

	const options = {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${base64Creds}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: 'grant_type=client_credentials',
	};

	try {
		const auth = await fetchApi(apiUrl, options);
		const token = await auth.json();
		res.status(200).send(token.access_token);
	} catch {
		console.error('Fetch error: ', Error);
		res.status(500).send('Unable to fetch FisToken');	
	}
};

const fetchHorizonToken = async (req: {fisToken: string, body:{userId: string, userSecret: string}}, res) => {
	const apiUrl = process.env.HORIZON_API_URL;

	const options = {
		method: 'PUT',
		headers: {
			'organization-id': process.env.ORGANIZATION_ID,
			'uuid': uuidv4(),
			'source-id': process.env.SOURCE_ID,
			'Authorization': `Bearer ${req.fisToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'userId': process.env.FIS_USER_ID,
			'userSecret': process.env.FIS_USER_SECRET
		}),
	};
	
	try{
		const response = await fetchApi(apiUrl, options);

		if (!response.ok) {
			res.status(response.status).send(response.statusText);
		}

		const auth = await response.json();
		res.status(200).send(auth.jwt);
	} catch {
		res.status(500).send('Server Error');
	}
};

exports.fetchFisToken = fetchFisToken;
exports.fetchHorizonToken = fetchHorizonToken;
