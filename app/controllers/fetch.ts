const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const FIS_API_URL = process.env.FIS_API_URL;
const HORIZON_API_URL = process.env.HORIZON_API_URL;
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID;
const SOURCE_ID = process.env.SOURCE_ID;
const FIS_USER_ID = process.env.FIS_USER_ID;
const FIS_USER_SECRET = process.env.FIS_USER_SECRET;


const fetchApi = async (apiUrl: string, options?: {}) => {
	try {
		console.log(`Fetching ${apiUrl} with options: ${JSON.stringify(options)}`);
		const response = await fetch(apiUrl, options);			    
		console.log(`Response received. Status: ${response.status}, Status Text: ${response.statusText}`);
	
		if (!response.ok) {
			const text = await response.text();
			console.error(`Fetch failed: ${response.status}, ${text}`);
			throw new Error(`Fetch failed: ${response.status}`);
		}	

		return response;
	} catch (error) {
		console.error('ERROR', error)
	}
};

const fetchFisToken = async (req: {}) => {
	const apiUrl = FIS_API_URL; 
	const base64Creds = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
	const requestBody = 'grant_type=client_credentials';

	const options = {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${base64Creds}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: requestBody,
	};

	const auth = await fetchApi(apiUrl, options);
	const token = await auth.json();
	return(token.access_token);
};

const fetchHorizonToken = async (req: {fisToken: string, body:{userId: string, userSecret: string}}) => {
	const apiUrl = HORIZON_API_URL;

	const options = {
		method: 'PUT',
		headers: {
			'organization-id': ORGANIZATION_ID,
			'uuid': uuidv4(),
			'source-id': SOURCE_ID,
			'Authorization': `Bearer ${req.fisToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'userId': FIS_USER_ID,
			'userSecret': FIS_USER_SECRET
		}),
	};

	const auth = await fetchApi(apiUrl, options);
	const token = await auth.json();
	return(token.jwt);
};

exports.fetchFisToken = fetchFisToken;
exports.fetchHorizonToken = fetchHorizonToken;
