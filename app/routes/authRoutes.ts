const express = require('express');
const { Request, Response } = require('express');
const authRouter = express.Router();
const cookiesMiddleware = require('universal-cookie-express');

const { fetchFisToken, fetchHorizonToken } = require('../controllers/authController')


// Home 
authRouter.get('/', (req: Request, res: Response) => { res.status(200).send('authorization endpoint');
});


// FIS Token
authRouter.get('/fis', async (req: Request, res: Response) => {
	console.log('FIS TOKEN REQUESTED');
	fetchFisToken(req, res);
});

// Horizon Token
authRouter.get('/horizon', async (req: Request, res: Response) => {
	console.log('HORIZON TOKEN REQUESTED');
	fetchHorizonToken(req, res);
});

module.exports = authRouter;
