const mongoose=require("mongoose");
const colors=require("colors");

const connectDB=async()=>{

    try{

        await mongoose.connect(process.env.MONGO_URL,{});

        console.log(colors.green(`Connected to MongoDB Database Successfully`));


    }catch(error){

        console.log(colors.red(`Error While Connecting to MongoDB Database`,error.message));

    }

}

module.exports=connectDB;