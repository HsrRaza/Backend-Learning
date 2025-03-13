import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import db from "./utils/db.utils.js"




dotenv.config();

const app = express();
const port = process.env.PORT


app.use(
    cors({
        origin:process.env.BASE_URL,
        credentials: true,
        methods:["GET","POST", "DELETE","OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded( { extended: true}))



app.get('/', (req, res)=>{
    res.send("Home Page")
})

// connect to db

db();

app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`);
    
})