const fs = require('fs');


//synchronous Call  .. blocking request

// fs.writeFileSync('./text.txt', "Hey");



// async it takes call func - Non blocking req
// fs.writeFile('./text.txt', "Hey this is async", (err) => {});


// readfile in sync

// const res = fs.readFileSync('./contacts.txt',"utf-8")
// console.log(res);


// readfile in async
// async doest return it take call fnc to give res Sync keyword is not used 

// fs.readFile("./contacts.txt", "utf-8" , (err, result) =>{
//     if(err){
//         console.log("Error", err);
//     } else{
//         console.log(result);
        
//     }
        
// })



// append FIle in sync..

// fs.appendFileSync("./text.txt", `${Date.now()} Hey There \n`);

// fs.cpSync('./text.txt', "./copy.txt") // it will copy and make new file 
// fs.unlinkSync("./copy.txt") // file is deleted 


//  console.log(fs.statSync("./text.txt"));
// fs.mkdirSync("my-doc")


// default Thread 4 -threads




  


