import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const dbconectstatus = await mongoose.connect(
            `${process.env.MONGO_URI}/farmersconnect`
        );

        dbconectstatus.connection.on("connected", () => {
            console.log(
                "db connected",
                dbconectstatus.connection.host,
                dbconectstatus.connection.name
            );
        });

        dbconectstatus.connection.on("error", () => {
            console.log(
                "some error occured in db",
                dbconectstatus.connection.host,
                dbconectstatus.connection.name
            );
        });
    } catch (error) {
        console.log("some error occured in db", error);
    }
};


export default connectDB