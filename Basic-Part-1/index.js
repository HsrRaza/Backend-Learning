import express from "express"
import dotenv from "dotenv";

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



app.listen(port , ()=>{
    console.log(`Example app listening on port ${port}`);
    
})