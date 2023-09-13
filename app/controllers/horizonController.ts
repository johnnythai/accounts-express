const { fetchApi } = require('./fetch');
require('dotenv').config();

const { v4: uuidv4 } = require('uuid');

const fetchCustomerRelationshipSummary = async (req, res) => {
	const options = {
		headers: {
			'organization-id': process.env.ORGANIZATION_ID,
			'uuid': uuidv4(),
			'source-id': process.env.SOURCE_ID,
			'horizon-authorization': `Bearer ${req.headers.horizontoken}`,
			'Content-Type': 'application/json'	
		},
	};
};

const fetchAccountInfo = async (req, res) => {
};

exports.fetchCustomerRelationshipSummary = fetchCustomerRelationshipSummary;
