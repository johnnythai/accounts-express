import { Request, Response } from 'express';
import { fetchApi } from './fetchApi.js';
import { v4 as uuidv4 } from 'uuid';
import env from '../../env.js';

interface Authentication extends Request {
	headers: {
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
		'organization-id': env.ORGANIZATION_ID,
		'uuid': uuidv4(),
		'source-id': env.SOURCE_ID,
		'horizon-authorization': `Bearer ${horizonToken}`,
		'accept': 'application/json',
		'Authorization': `Bearer ${fisToken}`,
	};

	return horizonApiHeaders;
};

const fetchAccountInfo = async (req: CustomerAccountRequest, res: Response) => {
	const applicationCode = req.params.applicationCode;
	const accountNumber = req.params.accountNumber;

	const horizonToken = req.headers.horizontoken;
	const fisToken = req.headers.fistoken;

	const options = {
		Headers: setHorizonApiHeaders(horizonToken, fisToken),
	};

	await fetchApi(req, res, `${env.HORIZON_ACCOUNT_AGGREGATION_API_URL}/accounts/${applicationCode}/${accountNumber}`, options);
};

const fetchCustomerRelationshipSummary = async (req: CustomerRequest, res: Response) => {
	const customerId = req.params.customerId;

	const horizonToken = req.headers.horizontoken;
	const fisToken = req.headers.fistoken;

	const options = {
		headers: setHorizonApiHeaders(horizonToken, fisToken),
	};	
	
	await fetchApi(req, res, `${env.HORIZON_CUSTOMER_API_URL}/customers/${customerId}/relationship-summary`, options);
};

export { fetchCustomerRelationshipSummary, fetchAccountInfo };
