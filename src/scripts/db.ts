import { MongoClient } from "mongodb";
import type { Db, Collection } from 'mongodb';

const MONGO_HOST = 'mongodb+srv://halgorithmics:hoynosecomeFamiliaXD@cluster0.msql0hb.mongodb.net/rubricasicfes?retryWrites=true&w=majority';

interface Comment {
  createdBy: { name: string };
  createdAt: Date;
  message: string;
  commentedAt: string;
}

export const mongoClient = new MongoClient(MONGO_HOST);

const clientPromise = mongoClient.connect();

const connectDB = async (): Promise<{ statusCode: number; body: Comment[] }> => {
  try {
    const database: Db = (await clientPromise).db('rubricasicfes');    
    const collection: Collection<Comment> = database.collection<Comment>('comments');
    const results: Comment[] = await collection.find({}).toArray();
    const filtered = results.map(entry => {
      const createdBy = {
        name: entry.createdBy.name,
      };
      const { createdAt, message, commentedAt } = entry;
      
      return { createdAt, message, commentedAt, createdBy };
    });

    return {
      statusCode: 200,
      body: filtered,
    };
  } catch (err: any) {
    console.error("[db] Error", MONGO_HOST, err);
    return {
      statusCode: 500,
      body: err.toString(),
    };
  }
};

export default connectDB;
