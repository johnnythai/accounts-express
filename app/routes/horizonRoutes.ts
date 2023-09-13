const express = require('express');
const horizonRouter = express.Router();
const cookiesMiddleware = require('universal-cookie-express');
const { fetchCustomerRelationshipSummary } = require('../controllers/horizonController');
const { fetchAcountInfo } = require('../controllers/horizonController');

horizonRouter.get('/', (req, res) => {
	res.status(200).send('horizon endpoint');
});

// Retreive account info 
horizonRouter.get('/accounts/:applicationCode/:accountNumber', (req, res) => {
	console.log('Fetching account info');
	fetchAcountInfo(req, res);
});

// Retrieves list of application/accounts for a customer
horizonRouter.get('/customers/:customerId/relationship-summary', (req, res) => {
	console.log('Fetching customer relationship summary.');
	fetchCustomerRelationshipSummary(req, res);
});



module.exports = horizonRouter;
