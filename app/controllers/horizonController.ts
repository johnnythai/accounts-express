const { fetchApi } = require('./fetchApi');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const setHorizonApiHeaders = (horizonToken: string, fisToken: string) => {
	const horizonApiHeaders = {
		'organization-id': process.env.ORGANIZATION_ID,
		'uuid': uuidv4(),
		'source-id': process.env.SOURCE_ID,
		'horizon-authorization': `Bearer ${horizonToken}`,
		'Content-Type': 'application/json',
		'Authorization': `Bearer ${fisToken}`,
	};

	return horizonApiHeaders;
};

const fetchAccountInfo = async (req, res) => {
	const applicationCode = req.params.applicationCode;
	const accountNumber = req.params.accountNumber;

	const horizonToken = req.headers.horizonToken;
	const fisToken = req.headers.fisToken;

	const options = {
		headers: setHorizonApiHeaders(horizonToken, fisToken),
	};

	await fetchApi(req, res, `${process.env.HORIZON_ACCOUNT_AGGREGATION_API_URL}/accounts/${applicationCode}/${accountNumber}`, options);
};

const fetchCustomerRelationshipSummary = async (req, res) => {
	const customerId = req.params.customerId;

	const horizonToken = req.headers.horizonToken;
	const fisToken = req.headers.fisToken;

	const options = {
		headers: setHorizonApiHeaders(horizonToken, fisToken),
	};	
	
	await fetchApi(req, res, `${process.env.HORIZON_CUSTOMER_API_URL}/customers/${customerId}/relationship-summary`, options);
};


exports.fetchCustomerRelationshipSummary = fetchCustomerRelationshipSummary;
exports.fetchAccountInfo = fetchAccountInfo;
