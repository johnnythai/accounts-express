import express, { Request, Response } from 'express';
import { fetchFisToken, fetchHorizonToken } from '../controllers/authController.js';

const authRouter = express.Router();

interface horizonRequest extends Request {
	headers: {
		fistoken?: string
	}
}

// Home 
authRouter.get('/', (req: Request, res: Response) => { 
	res.status(200).send('authorization endpoint');
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

export { authRouter };
