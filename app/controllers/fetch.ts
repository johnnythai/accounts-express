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
		const response = await fetch(apiUrl, options);
		return(response);
	} catch {
		console.error('Error', Error);
	};
};

const fetchFisToken = async (req: {}) => {
	const apiUrl = 'https://api-gw-uat.fisglobal.com/token'; 
	const base64Creds = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
	const requestBody = 'grant_type=client_credentials';

	const options = {
		method: 'PUT',
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
	const fisTemp = 'eyJ4NXQiOiJOemRrWkRjMU9XWmtPVFE0WTJNeE1XUXdOR013WkRjMVkyUXlaakEyWXpjMVl6TTROalZtTlRSaE16SXdZelV3TURVMU9UY3paVFE1T1dFMk9USm1OZyIsImtpZCI6Ik56ZGtaRGMxT1daa09UUTRZMk14TVdRd05HTXdaRGMxWTJReVpqQTJZemMxWXpNNE5qVm1OVFJoTXpJd1l6VXdNRFUxT1RjelpUUTVPV0UyT1RKbU5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJqb2hubnl0aGFpIiwiYXV0IjoiQVBQTElDQVRJT04iLCJhdWQiOiJMSEdLbndXTGxXSUtlTENNZEJwY0FkSlNSOXNhIiwibmJmIjoxNjkzNTA0NzgzLCJhenAiOiJMSEdLbndXTGxXSUtlTENNZEJwY0FkSlNSOXNhIiwic2NvcGUiOiJkZWZhdWx0IiwiaXNzIjoiaHR0cHM6XC9cLzEwMC43Mi4zNS4yNTo5NDQzXC9vYXV0aDJcL3Rva2VuIiwiZXhwIjoxNjkzNTA4MzgzLCJpYXQiOjE2OTM1MDQ3ODMsImp0aSI6IjdlMDRjZDMwLTUyYzQtNGI1MS04MmQ0LWI1NGQ1YzU2NjQ3ZSJ9.sA9ap2l55g-GeoVIYozi95U1bK_FbLL7I_Q0iU8ro2EAFmreL_IS1mMBTH6XC3MsgHxsAFELj5q-lr_6BsxWbB2QPv_kMjknxLV2poyVQofbHouLzElbdWPRfrXwNTU7186WsNdxaTNLwhhEn6PIOBHWEhaege9MGyTpj1daRK-UmEMtgrwmepyhpL0UgFYWqyAnJEx_qGMIEdJCAOn_JschKJolTYxA9uSzliLuVSFZpf1re5-YPBlnIiCH9DULN3uuY1CFHDEa0NxDrMn4PNgeBe0uDwHZdmjPxmucoo1_ZtjbKPZ7KXwQs_81hmKUiTcguauCBJulcbLNqTuX4w'

	const options = {
		method: 'PUT',
		headers: {
			'organization-id': ORGANIZATION_ID,
			'uuid': uuidv4(),
			'source-id': SOURCE_ID,
			'Authorization': `Bearer ${fisTemp}`,
			'Content-Type': 'application/json'
		},
		body: {
			'userId': FIS_USER_ID,
		       	'userSecret': FIS_USER_SECRET 
		},
	};

	const auth = await fetchApi(apiUrl, options);
	// const token = await auth.json();
	console.log('TOKEN_______________________', auth);
	return(auth);
};

exports.fetchFisToken = fetchFisToken;
exports.fetchHorizonToken = fetchHorizonToken;
