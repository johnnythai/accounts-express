const express = require('express');

const { v4: uuidv4 } = require('uuid');

require('dotenv').config();
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const ORGANIZATION_ID = process.env.ORGANIZATION_ID;
const SOURCE_ID = process.env.SOURCE_ID;


const fetchApi = async (apiUrl, options) => {
	try {
		const response = await fetch(apiUrl, options);
		return(response);
	} catch {
		console.error('Error', error);
	};
};

const fetchFisToken = async (req) => {
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

const fetchHorizonToken = async (req) => {
	const apiUrl = 'https://api-gw-uat.fisglobal.com/rest/horizon/authorization/v2/authorization';
	const fisToken = req.fisToken;
	const requestBody = req.body
	
	const id = uuidv4();
	console.log('uuid:', id);

	const options = {
		method: 'POST',
		headers: {
			'accept': 'application/json',
			'organization-id': ORGANIZATION_ID,
			'uuid': id,
			'source-id': SOURCE_ID,
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${fisToken}`,
		},
		body: requestBody,
	};
};

exports.fetchFisToken = fetchFisToken;
exports.fetchHorizonToken = fetchHorizonToken;
