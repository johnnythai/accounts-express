import * as dotenv from 'dotenv';
dotenv.config();

import { Request, Response } from 'express';
import { fetchApi } from './fetchApi';
import {  v4 as uuidv4 } from 'uuid'; 

interface horizonRequest extends Request {
	Headers: {
		fistoken: string
	}
}

const fetchFisToken = async (req: Request, res: Response) => {
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

const fetchHorizonToken = async (req: horizonRequest, res: Response) => {
	const options = {
		method: 'PUT',
		headers: {
			'organization-id': process.env.ORGANIZATION_ID,
			'uuid': uuidv4(),
			'source-id': process.env.SOURCE_ID,
			'Authorization': `Bearer ${req.Headers.fistoken}`,
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

export { fetchFisToken, fetchHorizonToken };
