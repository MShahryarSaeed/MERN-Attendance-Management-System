const userModel=require("../../../models/user.model");

const GetAllUsersByAdmin=async(req,res)=>{

    // const page=parseInt(req.query.page) ? parseInt(req.query.page) : 1;
    const startIndex=parseInt(req.query.startIndex) ? parseInt(req.query.startIndex) : 0;
    const limit=parseInt(req.query.limit) ? parseInt(req.query.limit) : 10;

    const users=await userModel.find({}).skip(startIndex).limit(limit).sort({createdAt:-1});

    if(users.length===0){
        throw {message:"No Users Found",statusCode:404}
    }

    const usersWithoutPassword=users.map((user)=>{
        const {password,...rest}=user._doc;
        return rest
    })

    res.status(200).json({
        status:"Success",
        message:"Users Found Successfully",
        users:usersWithoutPassword
    });

}

module.exports=GetAllUsersByAdmin;