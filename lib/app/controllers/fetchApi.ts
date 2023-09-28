import { Request, Response } from 'express';

const fetchApi = async (req: Request, res: Response, apiUrl: string, options?: {}) => {
	console.log(apiUrl);
	console.log(options);
	try {
		const response = await fetch(apiUrl, options);			    
		console.log(`Status: ${response.status}, Status Text: ${response.statusText}`);

		const jsonResponse = await response.json();
		console.log('Response received: ', jsonResponse);
		res.status(response.status).send(jsonResponse);
	} catch {
		res.status(500).send('Server Error');
	}
};

export { fetchApi };
