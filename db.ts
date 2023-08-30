const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();
const DB = process.env.DB;
const MONGODB_USER = process.env.MONGODB_USER;
const MONGODB_PW = process.env.MONGODB_PW;

const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PW}@${DB}.jjzzgzw.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	}
});

const main = async () => {
	try {
		await client.connect();	
		await client.db("admin").command({ ping: 1 });
		console.log("Pinged your deployment. You successfully connected to MongoDB!");
	} finally {
		await client.close();
	};
};

// main().catch(console.error)

module.exports = main;
