import * as dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

import { cleanEnv, str, num } from "envalid";

const env = cleanEnv(process.env, {
	NODE_ENV: str({ choices: ['development', 'production'] }),
	PORT: num(),
	SECRET_KEY: str(),
	FIS_AUTH_API_URL: str(),
	HORIZON_AUTH_API_URL: str(),
	HORIZON_CUSTOMER_API_URL: str(),
	HORIZON_ACCOUNT_AGGREGATION_API_URL: str(),
	CONSUMER_KEY: str(),
	CONSUMER_SECRET: str(),
	ORGANIZATION_ID: str(),
	SOURCE_ID: str(),
	DB: str(),
	MONGODB_USER: str(),
	MONGODB_PW: str(),
	FIS_USER_ID: str(),
	FIS_USER_SECRET: str()
});

export default env;
