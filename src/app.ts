import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { usersRouter } from './routes/usersRoutes.js';
import { authRouter } from './routes/authRoutes.js';
import { horizonRouter } from './routes/horizonRoutes.js';
import env from './env.js';
// import dbConnect from './app/models/db';


const app = express();

const corsOptions = {
	origin: [
		'https://johnnythai.dev',
		'https://fis.johnnythai.dev',
		'http://localhost:3001',
	]	
};
app.use(cors(corsOptions));
app.use(morgan('common'));
app.use(helmet());
app.use(express.json());

const port = env.PORT;
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
