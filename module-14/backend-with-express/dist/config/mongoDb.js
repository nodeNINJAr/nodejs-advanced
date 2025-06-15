"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI environment variable is not defined");
}
const client = new mongodb_1.MongoClient(process.env.MONGO_URI, {
    serverApi: {
        version: mongodb_1.ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
// 
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    // Send a ping to confirm a successful connection
    const db = yield client.db("todosDB");
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    return db;
});
exports.default = connectDb;
