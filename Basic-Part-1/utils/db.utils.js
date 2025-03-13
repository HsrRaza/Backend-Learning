import mongoose from "mongoose";


const db = () => {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("connected to mongodba");

        })
        .catch((err) => {
            console.log("Error connecting to mongoose");

        })
}

export default db;