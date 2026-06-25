import mongoose from "mongoose";

export async function connect(){
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("Database connected successfully");
        });

        connection.on('error', (err) => {
            console.log("Error connecting to database : " + err);
            process.exit();
        });

    } catch (error) {
        console.log("Error connecting to database", error);
    }
}