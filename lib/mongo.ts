import { MongoClient, MongoClientOptions } from "mongodb";

const uri = process.env.MONGODB_URI;
const options: MongoClientOptions = {
  appName: '308er',
};

if(!uri) {
    throw new Error('Add Mongo URI to .env');
}

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;