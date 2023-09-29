import { Request, Response } from 'express';
import fetch from 'node-fetch';

const fetchApi = async (req: Request, res: Response, apiUrl: string, options?: {}) => {
	console.log(apiUrl);
	console.log(options);
	try {
		const response = await fetch(apiUrl, options);			    
		console.log(`Status: ${response.status}, Status Text: ${response.statusText}`);

		if (!response.ok) {
			const text = await response.text();
			console.error('API error:', text);
			return res.status(response.status).send(text);
		}

		const jsonResponse = await response.json();
		console.log('Response received: ', jsonResponse);
		res.status(response.status).json(jsonResponse);
	} catch {
		res.status(500).send('Server Error');
	}
};

export { fetchApi };
