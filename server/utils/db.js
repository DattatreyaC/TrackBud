import mongoose from "mongoose";

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        if (connection) {
            console.log(
                `MongoDB connected on host : ${connection.connection.host}`,
            );
        }
    } catch (error) {
        console.log(`Error connecting to DB : ${error.message}`);
    }
};

export default connectToDb;
