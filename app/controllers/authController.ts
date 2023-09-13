const { fetchApi } = require('./fetchApi');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


const fetchFisToken = async (req: {}, res: any) => {
	const base64Creds = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');

	const options = {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${base64Creds}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: 'grant_type=client_credentials',
	};

	await fetchApi(req, res, process.env.FIS_AUTH_API_URL, options);	
};

const fetchHorizonToken = async (req: {fisToken: string}, res) => {
	const options = {
		method: 'PUT',
		headers: {
			'organization-id': process.env.ORGANIZATION_ID,
			'uuid': uuidv4(),
			'source-id': process.env.SOURCE_ID,
			'Authorization': `Bearer ${req.headers.fistoken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'userId': process.env.FIS_USER_ID,
			'userSecret': process.env.FIS_USER_SECRET
		}),
	};
	
	console.log(process.env.HORIZON_API_URL);
	await fetchApi(req, res, process.env.HORIZON_AUTH_API_URL, options);
};

exports.fetchFisToken = fetchFisToken;
exports.fetchHorizonToken = fetchHorizonToken;
