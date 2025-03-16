import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./utils/db.utils.js"

// imports all routes

import userRoutes  from "./routes/user.routes.js"


dotenv.config();



const app = express();
const port = process.env.PORT || 4000;


app.use(
    cors({
        origin:process.env.BASE_URL,
        credentials: true,
        methods:["GET","POST", "DELETE","OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);
app.use(express.json());
app.use(express.urlencoded( { extended: true}));
app.use(cookieParser());





app.get('/', (req, res)=>{
    res.send("Home Page")
})

// connect to db

db();

// user Routes
app.use("/api/v1/users", userRoutes);

app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`);
    
});