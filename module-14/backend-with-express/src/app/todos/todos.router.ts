import express, { Request, Response } from "express"
import connectDB from "../../config/mongoDb";
import { ObjectId } from "mongodb";


const todosRouter = express.Router();
 
// call the database function
todosRouter.get("/", async(req:Request, res:Response) =>{
    const db =await connectDB();
    const todosCollection = await db.collection('todos');
    const result = await todosCollection.find().toArray();
    res.status(200).send(result)
})


// 
todosRouter.post("/create-todos", async(req:Request, res:Response)=>{
    const data = req.body;
    const db = await connectDB();
    const todosCollection = await db.collection('todos');
    const result = await todosCollection.insertOne(data);
     res.status(201).send(result)
})

// **
todosRouter.get("/:id", async(req:Request, res:Response)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
     //  
     const db = await connectDB();
     const todosCollection = await db.collection('todos');
     const result = await todosCollection.findOne(query);
     res.status(200).send(result)
})


//** */
todosRouter.put("/update-todo/:id", async(req:Request, res:Response)=>{
    const id = req.params.id;
    const {title,description,priority,isCompleted} = req.body;
    const db = await connectDB();
    const todosCollection = await db.collection('todos');
     const filter = {_id: new ObjectId(id)};
     const result = await todosCollection.updateOne(filter,{$set: {title,description,priority,isCompleted}},{upsert:true})
     res.status(201).send(result)
})

// ** delete
todosRouter.delete("/delete-todo/:id", async(req:Request, res:Response)=>{
    const id = req.params.id;
    const query = {_id: new ObjectId(id)};
    const db = await connectDB();
    const todosCollection = await db.collection('todos');
    // 
    const result = await todosCollection.deleteOne(query);
     res.status(201).send(result)
})

export {todosRouter};