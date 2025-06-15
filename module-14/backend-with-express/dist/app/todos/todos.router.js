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
exports.todosRouter = void 0;
const express_1 = __importDefault(require("express"));
const mongoDb_1 = __importDefault(require("../../config/mongoDb"));
const mongodb_1 = require("mongodb");
const todosRouter = express_1.default.Router();
exports.todosRouter = todosRouter;
// call the database function
todosRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield (0, mongoDb_1.default)();
    const todosCollection = yield db.collection('todos');
    const result = yield todosCollection.find().toArray();
    res.status(200).send(result);
}));
// 
todosRouter.post("/create-todos", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const db = yield (0, mongoDb_1.default)();
    const todosCollection = yield db.collection('todos');
    const result = yield todosCollection.insertOne(data);
    res.status(201).send(result);
}));
// **
todosRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = { _id: new mongodb_1.ObjectId(id) };
    //  
    const db = yield (0, mongoDb_1.default)();
    const todosCollection = yield db.collection('todos');
    const result = yield todosCollection.findOne(query);
    res.status(200).send(result);
}));
//** */
todosRouter.put("/update-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { title, description, priority, isCompleted } = req.body;
    const db = yield (0, mongoDb_1.default)();
    const todosCollection = yield db.collection('todos');
    const filter = { _id: new mongodb_1.ObjectId(id) };
    const result = yield todosCollection.updateOne(filter, { $set: { title, description, priority, isCompleted } }, { upsert: true });
    res.status(201).send(result);
}));
// ** delete
todosRouter.delete("/delete-todo/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = { _id: new mongodb_1.ObjectId(id) };
    const db = yield (0, mongoDb_1.default)();
    const todosCollection = yield db.collection('todos');
    // 
    const result = yield todosCollection.deleteOne(query);
    res.status(201).send(result);
}));
