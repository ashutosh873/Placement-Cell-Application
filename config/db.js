import mongoose from "mongoose";

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MongoDBURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        });
        console.log("Database connected successfully");
    }catch(err){
        console.log("Database connection failed with the following error: ");
        console.log(err);
    }
   
}
export default connectDB;