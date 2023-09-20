import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './app/routes/authRoutes';
import usersRouter from './app/routes/usersRoutes';
import horizonRouter from './app/routes/horizonRoutes';
// import dbConnect from './app/models/db';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();

const corsOptions = {
	origin: [
		'https://johnnythai.dev',
		'https://fis.johnnythai.dev',
		'http://localhost:3001',
	]	
};
app.use(cors<Request>(corsOptions));
app.use(morgan('common'));
app.use(helmet());
app.use(express.json());

const port = process.env.PORT;
// const dbConnection = db();


// Authentication
app.use('/api/users', usersRouter);

// Authorization
app.use('/api/authorization', authRouter);

// Horizon
app.use('/api/horizon', horizonRouter);

//Home
app.get('/', (req: Request, res: Response) => {
	res.status(200).send('accounts-express app home for FIS HORIZON API');
});

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
