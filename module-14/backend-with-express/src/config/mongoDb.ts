import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv"
dotenv.config();

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not defined");
}
const client = new MongoClient(process.env.MONGO_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// 
const connectDb = async()=>{
     await client.connect();
    // Send a ping to confirm a successful connection
    const db = await client.db("todosDB");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return db
}

export default connectDb