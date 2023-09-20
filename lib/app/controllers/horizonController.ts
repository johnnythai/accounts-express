import { Request, Response } from 'express';
import { fetchApi } from './fetchApi.js';
import { v4 as uuidv4 } from 'uuid';
import env from '../../env.js';


const setHorizonApiHeaders = (req: Request, res: Response) => {
	const horizonToken = req.headers.horizontoken;
	const fisToken = req.headers.fistoken;

	if (!horizonToken || !fisToken) {
		return res.status(401).send('Unauthorized.');
	}

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

const fetchAccountInfo = async (req: Request, res: Response) => {
	const applicationCode = req.params.applicationCode;
	const accountNumber = req.params.accountNumber;

	if (!applicationCode || !accountNumber) {
		return res.status(400).send('Bad request.');
	}

	const options = { headers: setHorizonApiHeaders(req, res) };

	await fetchApi(req, res, `${env.HORIZON_ACCOUNT_AGGREGATION_API_URL}/accounts/${applicationCode}/${accountNumber}`, options);
};

const fetchCustomerRelationshipSummary = async (req: Request, res: Response) => {
	const customerId = req.params.customerId;

	if (!customerId) {
		return res.status(400).send('Bad request.');
	}

	const options = { headers: setHorizonApiHeaders(req, res) };	
	
	await fetchApi(req, res, `${env.HORIZON_CUSTOMER_API_URL}/customers/${customerId}/relationship-summary`, options);
};

export { fetchCustomerRelationshipSummary, fetchAccountInfo };
