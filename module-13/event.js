const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {};

const schoolBell = new SchoolBell();

schoolBell.on("ring", ()=>{
    console.log("Yahoo!! Class Shes");
})

schoolBell.on("broken", ()=>{
    console.log("Yahoo!! Class not so heart is broken");
})

schoolBell.emit("ring");
schoolBell.emit("broken")