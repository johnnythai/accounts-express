import {Auth, W} from "mongodb";

const { Request, Response } = require('express');
const { fetchApi } = require('./fetchApi');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

interface Authentication extends Request {
	Headers: {
		horizontoken: string,
		fistoken: string,
	}	
}

interface CustomerRequest extends Authentication {
	params: {
		customerId: string,
	},
}

interface CustomerAccountRequest extends Authentication {
	params: {
		applicationCode: string,
		accountNumber: string,
	}
}

const setHorizonApiHeaders = (horizonToken: string, fisToken: string) => {
	const horizonApiHeaders = {
		'organization-id': process.env.ORGANIZATION_ID,
		'uuid': uuidv4(),
		'source-id': process.env.SOURCE_ID,
		'horizon-authorization': `Bearer ${horizonToken}`,
		'accept': 'application/json',
		'Authorization': `Bearer ${fisToken}`,
	};

	return horizonApiHeaders;
};

const fetchAccountInfo = async (req: CustomerAccountRequest, res: Response) => {
	const applicationCode = req.params.applicationCode;
	const accountNumber = req.params.accountNumber;

	const horizonToken = req.Headers.horizontoken;
	const fisToken = req.Headers.fistoken;

	const options = {
		Headers: setHorizonApiHeaders(horizonToken, fisToken),
	};

	await fetchApi(req, res, `${process.env.HORIZON_ACCOUNT_AGGREGATION_API_URL}/accounts/${applicationCode}/${accountNumber}`, options);
};

const fetchCustomerRelationshipSummary = async (req: CustomerRequest, res: Response) => {
	const customerId = req.params.customerId;

	const horizonToken = req.Headers.horizontoken;
	const fisToken = req.Headers.fistoken;

	const options = {
		headers: setHorizonApiHeaders(horizonToken, fisToken),
	};	
	
	await fetchApi(req, res, `${process.env.HORIZON_CUSTOMER_API_URL}/customers/${customerId}/relationship-summary`, options);
};


exports.fetchCustomerRelationshipSummary = fetchCustomerRelationshipSummary;
exports.fetchAccountInfo = fetchAccountInfo;
