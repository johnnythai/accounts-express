import express, { Request, Response } from 'express';
import { fetchCustomerRelationshipSummary } from '../controllers/horizonController.js';
import { fetchAccountInfo } from '../controllers/horizonController.js';

const horizonRouter = express.Router();

horizonRouter.get('/', (req: Request, res: Response) => {
	res.status(200).send('horizon endpoint');
});
// Retreive account info 
horizonRouter.get('/accounts/:applicationCode/:accountNumber', (req: Request, res: Response) => {
	console.log('Fetching account info');
	fetchAccountInfo(req, res);
});

// Retrieves list of application/accounts for a customer
horizonRouter.get('/customers/:customerId/relationship-summary', (req: Request, res: Response) => {
	console.log('Fetching customer relationship summary.');
	fetchCustomerRelationshipSummary(req, res);
});

export { horizonRouter };
