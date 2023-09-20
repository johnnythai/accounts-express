import { MongoClient, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';
import env from '../../env.js';


const uri = `mongodb+srv://${env.MONGODB_USER}:${env.MONGODB_PW}@${env.DB}.jjzzgzw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

const dbConnect = async () => {
	try {
		await mongoose.connect(uri);	
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		await client.close();
	};
};

export default dbConnect;
