import express, { Application, NextFunction, Request, Response } from 'express'
import { todosRouter } from './todos/todos.router';

// 
const app:Application = express();


// middleware parser
app.use(express.json())


// router
const userRouter = express.Router();

//** */ 
app.use("/todos", todosRouter);
app.use("/users", userRouter)




// 
app.get("/", (req:Request, res:Response)=>{
    res.send("Server is running")
})




// error handling
app.get('/', (req:Request,res:Response, next:NextFunction)=>{
   console.log({
       url:req.url,
       method:req.method,
       header:req.header,
   });
   next();
})

app.get('/error', async (req:Request,res:Response, next:NextFunction)=>{
   try{
      res.send("welcome to todos app")
   }catch(err){
      next(err)
   }
})


// if route not found
app.use((req, res, next)=>{
    res.status(404).json({message:"Route Not found"})
})

// 
app.use((error:any, req:Request, res:Response, next:NextFunction)=>{
    if(error){
     console.log("Error", error);
     res.status(400).json({message:"Something went Wrong from global error handler", error})
    }
})




export default app;

