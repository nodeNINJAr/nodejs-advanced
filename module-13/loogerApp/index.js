
const path = require('path');
const fs = require('fs');
// catch the file from input
const inputArg = process.argv.slice(2);


const text = inputArg.join(' ');
const timeStamp = new Date().toISOString();
console.log(timeStamp);
 const message = `${text} ${timeStamp} \n`



// 
 if(!message){
     console.log('please provide a log text');
     console.log('Example: node index.js hello wrold');
     process.exit(1)
 }

//  file path
 const filePath = path.join(__dirname, 'log.txt');
//  append inside the file
 fs.appendFile(filePath,message, {encoding:'utf-8'}, ()=>{
    console.log("File path has been append to this file");
 });
 console.log(filePath);
