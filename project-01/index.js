const express = require('express');



const  { connectMongoDb } = require("./connection")
const {logReqRes} = require("./middleware")

const userRouter = require("./routes/user.routes")

const app = express();
const PORT = 8000;

// connection
connectMongoDb('mongodb://127.0.0.1:27017/youtube-app-1').then( ()=> console.log("mongoDb Connected"))






// middlewres  - plugin

app.use(express.urlencoded({extended: false}));
app.use(logReqRes("log.txt"))



//routes

app.use("/api/users",userRouter)

app.listen(PORT, ()=>{
    console.log(`Server started at Port ${PORT} `);
    
})