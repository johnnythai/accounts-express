import { Request, Response } from 'express';
import { fetchApi } from './fetchApi.js';
import {  v4 as uuidv4 } from 'uuid'; 
import env from '../../env.js';


const fetchFisToken = async (req: Request, res: Response) => {
	const base64Creds = Buffer.from(`${env.CONSUMER_KEY}:${env.CONSUMER_SECRET}`).toString('base64');

	const options = {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${base64Creds}`,
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: 'grant_type=client_credentials',
	};
	
	await fetchApi(req, res, env.FIS_AUTH_API_URL, options);	
};

const fetchHorizonToken = async (req: Request, res: Response) => {
	if (!req.headers.fistoken) {
		return res.status(401).send('Unauthorized');
	}

	const options = {
		method: 'PUT',
		headers: {
			'organization-id': env.ORGANIZATION_ID,
			'uuid': uuidv4(),
			'source-id': env.SOURCE_ID,
			'Authorization': `Bearer ${req.headers.fistoken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'userId': env.FIS_USER_ID,
			'userSecret': env.FIS_USER_SECRET
		}),
	};
	
	console.log(env.HORIZON_AUTH_API_URL);
	await fetchApi(req, res, env.HORIZON_AUTH_API_URL, options);
};

export { fetchFisToken, fetchHorizonToken };
