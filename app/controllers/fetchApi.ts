const fetchApi = async (req, res, apiUrl: string, options?: {}) => {
	try {
		const response = await fetch(apiUrl, options);			    
		console.log(`Status: ${response.status}, Status Text: ${response.statusText}`);

		if (!response.ok) {
			console.error(`Fetch failed: ${response.status}. ${response.statusText}`);
			return res.status(response.status).send({
				'Error': response.statusText
			});
		}	

		const jsonResponse = await response.json();
		res.status(response.status).send(jsonResponse);
	} catch {
		res.status(500).send('Server Error');
	}
};

exports.fetchApi = fetchApi;
