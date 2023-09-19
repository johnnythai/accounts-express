const express = require('express');
const { Request, Response } = ('express');
const horizonRouter = express.Router();
const cookiesMiddleware = require('universal-cookie-express');
const { fetchCustomerRelationshipSummary } = require('../controllers/horizonController');
const { fetchAccountInfo } = require('../controllers/horizonController');

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



module.exports = horizonRouter;
