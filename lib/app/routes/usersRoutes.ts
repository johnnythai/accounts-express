import express, { Request, Response } from 'express';
import { register, login } from '../controllers/usersController';
require('dotenv').config();

const usersRouter = express.Router();

usersRouter.get('/', (req: Request, res: Response) => {
	res.status(200).send('users endpoint');
});

usersRouter.post('/register', register); 

usersRouter.post('/login', login);
		 
export default usersRouter;
