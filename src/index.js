import 'dotenv/config';
import { app } from './app.js';

// import dotenv from "dotenv";
import connectDB from './db/index.js';


// dotenv.config({
//     path:'./env'
// })



connectDB()
.then(()=>{
    app.listen(process.env.PORT||8000,()=>{
        console.log(`Server is running at port : ${process.env.PORT}`);

    });
})
.catch((err)=>{
    console.log("MOGO DB connection failed !!! ",err);
})






// (async()=>{
//     try{
//        await  mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
//        app.on("error",(error)=>{
//         console.log("ERROR", error);
//         throw error
//        })
//        app.listen(process.env.PORT,()=>{
//         console.log(`App is listening on Port ${process.env.PORT}`);
//        })
//     }catch(error){
//         console.log("ERROR : ",error);
//         throw err
//     }



// })()