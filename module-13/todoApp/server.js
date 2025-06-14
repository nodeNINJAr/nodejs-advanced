const http = require('http');
const port = process.env.PORT || 5000;




const todos = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false
  },
  {
    id: 2,
    title: "Build a todo app",
    completed: false
  },
  {
    id: 3,
    title: "Deploy project",
    completed: true
  }
];


const server = http.createServer((req, res)=>{
    console.log(req.url, req.method);
  if(req.url==='/todos' &&  req.method=== "GET"){
         res.writeHead(201, {
            "content-type":"text/html",
             "email" : "mehedi@gmail.com"
         });


    //  differenr way to send header
    // res.setHeader("content-type", "application/json")
    // res.setHeader("email", "mehedi@gmail.com")
    // res.statusCode = 201;
    
    // res.end(JSON.stringify(todos))
      
    res.end( `<h1>heading 1</h1> <h2>heading 2</h2>
        `
    )

  }else if(req.url==="/todos/create-todos" && req.method ==="POST"){
        res.end("todos created")
  }else{
      res.end('Route not found')
  }

})


server.listen(port,"127.0.0.1",()=>{
    console.log(`✅✅Server lisinig to the port ${port}`)
})