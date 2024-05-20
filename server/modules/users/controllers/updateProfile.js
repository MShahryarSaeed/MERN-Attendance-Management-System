const bcryptjs=require("bcrypt");
const userModel = require("../../../models/user.model");

const updateProfile=async(req,res)=>{

    const{username,email}=req.body;
    const{userId}=req.params;

    if(req.user._id!==userId){

        throw {message:"Unauthorized User",statusCode:401}
    }

    if(req.body.password){

        req.body.password=await bcryptjs.hash(req.body.password,10);
    }

    if(username){

        const existingUsername=await userModel.findOne({username:username});

        if(existingUsername){

            throw {message:"Username Already Exists",statusCode:400}

        }

    }

    const updatedUser=await userModel.findByIdAndUpdate(
        {_id:userId},
        {
            $set:{
                username:username,
                email:email,
                password:req.body.password,
                profilePicture:req.file.path
            }
        },
        {
            new:true,
            runValidators:true
        }
    );

    if(!updatedUser){

        throw {message:"User Not Found",statusCode:404}

    }

    const {password:pass,...rest}=updatedUser._doc;

    res.status(200).json({
        status:"Success",
        message:"Profile Updated Successfully",
        user:rest
    })


}

module.exports=updateProfile;