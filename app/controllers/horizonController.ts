const { fetchApi } = require('./fetchApi');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();


const fetchCustomerRelationshipSummary = async (req, res) => {
	// const options = {
	// 	headers: {
	// 		'organization-id': process.env.ORGANIZATION_ID,
	// 		'uuid': uuidv4(),
	// 		'source-id': process.env.SOURCE_ID,
	// 		'horizon-authorization': `Bearer ${req.headers.horizontoken}`,
	// 		'Content-Type': 'application/json'	
	// 	},
	// };
	res.status(200).send('relationship-summary');
	
	// await fetchApi(req, res, `${process.env.HORIZON_CUSTOMER_API_URL}/customers/${req.params.customerId}/relationship-summary`, options);
};

// const fetchAccountInfo = async (req, res) => {
// };

exports.fetchCustomerRelationshipSummary = fetchCustomerRelationshipSummary;
