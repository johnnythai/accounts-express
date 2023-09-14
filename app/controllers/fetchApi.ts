const fetchApi = async (req, res, apiUrl: string, options?: {}) => {
	console.log(apiUrl);
	console.log(options);
	try {
		const response = await fetch(apiUrl, options);			    
		console.log(`Status: ${response.status}, Status Text: ${response.statusText}`);

		const jsonResponse = await response.json();
		res.status(response.status).send(jsonResponse);
	} catch {
		res.status(500).send('Server Error');
	}
};

exports.fetchApi = fetchApi;
