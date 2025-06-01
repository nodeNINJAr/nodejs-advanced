const {a, add} = require('./file2');
// alias on common js
const {a:a1, add:add1} = require('./file');
console.log(a1, add1(20,20));



