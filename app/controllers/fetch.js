const express = require('express');

require('dotenv').config();
const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;


const fetchApi = async (apiUrl, options) => {
	const response = await fetch(apiUrl, options);
	if (!response.ok) {
		throw new Error('Network error');
	};

	return(response);
};

const fetchFisToken = async () => {
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
	console.log('AUTHHHHH:', auth);
	const token = auth.json();
	console.log('access otke123123', token);
	return(token.access_token);
};

const fetchHorizonToken = async () => {
	console.log('fetchHorizonToken function');
	return('HorizonToken');
};

exports.fetchFisToken = fetchFisToken;
exports.fetchHorizonToken = fetchHorizonToken;
