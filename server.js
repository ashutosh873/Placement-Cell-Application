import appServer from "./app.js";
import connectDB from "./config/db.js";
appServer.listen(process.env.APP_PORT,async(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Placement Cell App Server is listening at port 3000");
        await connectDB();
        
        
    }
    
});