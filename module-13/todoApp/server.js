const http = require('http');
const port = process.env.PORT || 5000;
const path = require('path');
const fs = require('fs');








const filePath = path.join(__dirname,"./db/todos.json")


// 
const server = http.createServer((req, res)=>{
    // console.log(req.url, req.method);
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;


  if(pathname==='/todos' &&  req.method=== "GET"){
     const data = fs.readFileSync(filePath,{encoding:"utf-8"})
         res.writeHead(200, {
            "content-type":"application/json"
         });


    //  differenr way to send header
    // res.setHeader("content-type", "application/json")
    // res.setHeader("email", "mehedi@gmail.com")
    // res.statusCode = 201;
    
    // res.end(JSON.stringify(todos))
      
    res.end(data)

  }else if(pathname==="/todos/create-todos" && req.method ==="POST"){
        let data =""
        req.on("data",(chunk)=>{
           data += chunk
        })
        
        req.on("end",()=>{
            console.log(data);
               const {id, title,body, completed} = JSON.parse(data);
               const createdAt = new Date().toLocaleString();

            const allTodos = fs.readFileSync(filePath,{encoding:"utf-8"});
             console.log(allTodos);
            const parsedAlltodos = JSON.parse(allTodos);
             parsedAlltodos.push({id, title,body, completed,createdAt});
            fs.writeFileSync(filePath,JSON.stringify(parsedAlltodos, null , 2),{encoding:"utf-8"})
            res.end(JSON.stringify({id, title,body, completed,createdAt}, null, 2))
        })
        // res.end("todos created", allTodos)
  }else if(pathname === "/todo" && req.method=== "GET"){
       const title = url.searchParams.get("title")
//   
     const data = fs.readFileSync(filePath,{encoding:"utf-8"})
      const parseData = JSON.parse(data);
    //   
     const todo = parseData.find((sTodo)=> sTodo.title === title)
    //   
      const stringifyedTodo = JSON.stringify(todo);

         res.writeHead(200, {
            "content-type":"application/json"
         });
       res.end(stringifyedTodo)
  }else if(pathname==="/todos/update-todo" && req.method ==="PATCH"){
        //    query params
        const title = url.searchParams.get("title")
        //get updateed data by body 
        let data =""
        req.on("data",(chunk)=>{
           data += chunk
        })
        
        req.on("end",()=>{
               const {body} = JSON.parse(data);

            const allTodos = fs.readFileSync(filePath,{encoding:"utf-8"});
            const parsedAlltodos = JSON.parse(allTodos);
            
            const todoIndex = parsedAlltodos.findIndex((todo)=> todo.title === title );
             parsedAlltodos[todoIndex].body = body;
            fs.writeFileSync(filePath,JSON.stringify(parsedAlltodos, null , 2),{encoding:"utf-8"})
            res.end(JSON.stringify({title,body,createdAt:parsedAlltodos[todoIndex].createdAt}, null, 2))
        })
        // res.end("todos created", allTodos)
  }else if(pathname==="/todos/delete-todo" && req.method ==="DELETE"){
        //    query params
        const title = url.searchParams.get("title");
         const allTodos = fs.readFileSync(filePath,{encoding:"utf-8"});
            const parsedAlltodos = JSON.parse(allTodos);
            const afterDelete = parsedAlltodos.filter((item)=> item.title !== title);
           fs.writeFileSync(filePath,JSON.stringify(afterDelete, null , 2),{encoding:"utf-8"});
        res.end(JSON.stringify(afterDelete, null, 2))
 
  }
  
  
  else{
      res.end('Route not found')
  }

})


server.listen(port,"127.0.0.1",()=>{
    console.log(`✅✅Server lisinig to the port ${port}`)
})