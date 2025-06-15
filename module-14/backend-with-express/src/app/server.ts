import connectDB from "../config/mongoDb";
import app from "./app"



let server;
const port = process.env.PORT || 5000;


// 
const bootstrap = async()=>{
     await connectDB();
    // server lisining
  server =  app.listen(port,()=>{
        console.log(`Server is listening on the port ${port}`);
    })
}

bootstrap();