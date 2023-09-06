const fetchApi = async (apiUrl: string, options?: {}) => {
	// console.log(`Fetching ${apiUrl} with options: ${JSON.stringify(options)}`);
	const response = await fetch(apiUrl, options);			    
	console.log(`Status: ${response.status}, Status Text: ${response.statusText}`);

	/*
	if (!response.ok) {
		const text = await response.text();
		console.error(`Fetch failed: ${response.status}, ${text}`);
		throw new Error(`Fetch failed: ${response.status}`);
	}	
       */

	return response;
};

exports.fetchApi = fetchApi;
