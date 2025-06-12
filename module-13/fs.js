// syncronus

// file read ->>I/O intensive task -->> on single thread nor going to thread pool
// const fs = require('fs');
// console.log("task 1");

// 
// const text="task 1"
// fs.writeFileSync('./text.txt', text);
// console.log('task 6');


// const data = fs.readFileSync("./text.txt",{encoding:"utf-8"});

// console.log("task-5");

// console.log(data);

// asynscronus
// file read --> single-thread --> event-loop ---> thread pool ---> task complete

const fs = require('fs');

console.log('task-1');
  
 let text = 'node js'


// write file
fs.writeFile('./text.txt',text, {encoding:'utf8'}, (err) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
});




let asy = 'node jsx';
fs.readFile('./text.txt', {encoding:'utf8'}, (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }
  asy = data;
  console.log('inside async:', data);
});

console.log(asy);
console.log('task-3');
console.log(text);






// asyncronus
//  file read -->> single thread --->> event-loop -->> thread pool -->> task complitation
