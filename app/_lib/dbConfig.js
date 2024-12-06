import mongoose from "mongoose";

const uri = process.env.MONGO_URI


export async function connect() {
    try {
        mongoose.connect(uri);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected")
        })

        connection.on("error", (err) => {
            console.log("An error occcured in MongoDB. Make sure DB is running. Error: ", err)
            process.exit();
        })

    } catch (error) {
        console.log("Couldn't connect to DB: ", error)
    }
}