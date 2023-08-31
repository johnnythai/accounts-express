const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
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
	const apiUrl = 'https://api-gw-uat.fisglobal.com/token'; 
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
	const apiUrl = 'https://api-gw-uat.fisglobal.com/rest/horizon/authorization/v2/authorization';
	const fisTemp = 'eyJ4NXQiOiJOemRrWkRjMU9XWmtPVFE0WTJNeE1XUXdOR013WkRjMVkyUXlaakEyWXpjMVl6TTROalZtTlRSaE16SXdZelV3TURVMU9UY3paVFE1T1dFMk9USm1OZyIsImtpZCI6Ik56ZGtaRGMxT1daa09UUTRZMk14TVdRd05HTXdaRGMxWTJReVpqQTJZemMxWXpNNE5qVm1OVFJoTXpJd1l6VXdNRFUxT1RjelpUUTVPV0UyT1RKbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJqb2hubnl0aGFpIiwiYXV0IjoiQVBQTElDQVRJT04iLCJhdWQiOiJMSEdLbndXTGxXSUtlTENNZEJwY0FkSlNSOXNhIiwibmJmIjoxNjkzNTEzNDM2LCJhenAiOiJMSEdLbndXTGxXSUtlTENNZEJwY0FkSlNSOXNhIiwic2NvcGUiOiJkZWZhdWx0IiwiaXNzIjoiaHR0cHM6XC9cLzEwMC43Mi4zNS4yNTo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjkzNTE3MDM2LCJpYXQiOjE2OTM1MTM0MzYsImp0aSI6IjFlOGNlYTY0LTI5ZDgtNDQ3Zi1iMmEyLWYzY2Y2MTVlYzNjMyJ9.LDhbwHBdEMoHTbWVo49QwC8XhsCzjd9UX0BBqvWmQOhxWmEopUrodiKIXPGXdnPLy-sL6ZuwGIB48HzJDPwLynW7gZ3To35ZAgclN8zMy8FSDa9kpReeNNOKd5lolmF4m4PwJNSSOQD69gaiYFXtSZoC3lcOWqi3H1jez-Hk07JraT_Pm911-rWXKRruo84W7xbRUC9_BVnLzScAoH9UdBbOFmZJCw8USjHcnlqrwHO6GEZPzr1sfZKsW7qVA65txNwRkkihtT5F4cUbpbFnI8bD0yc3jXJuXYWCR5MYGebgiDqr8mRd3aFEMQiQJE0F4iEBcIJFVckNsbNsVOITeg'
	const body = {
		'userId': FIS_USER_ID,
		'userSecret': FIS_USER_SECRET 
	}
	const requestBody = JSON.stringify(body);

	const options = {
		method: 'PUT',
		headers: {
			'organization-id': ORGANIZATION_ID,
			'uuid': uuidv4(),
			'source-id': SOURCE_ID,
			'Authorization': `Bearer ${fisTemp}`,
			'Content-Type': 'application/json'
		},
		body: requestBody,
	};

	const auth = await fetchApi(apiUrl, options);
	const token = await auth.json();
	console.log('TOKEN_______________________', token.jwt);
	return(token.jwt);
};

exports.fetchFisToken = fetchFisToken;
exports.fetchHorizonToken = fetchHorizonToken;
