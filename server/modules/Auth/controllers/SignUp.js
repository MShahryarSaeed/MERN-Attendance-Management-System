const userModel=require("../../../models/user.model");
const bcrypt=require("bcrypt");

const SignUp=async(req,res)=>{

    const{username,email,password}=req.body;

    if(!username) throw {message:"username is Required",statusCode:400}
    if(!email) throw {message:"Email is Required",statusCode:400}
    if(!password) throw {message:"Password is Required",statusCode:400}

    const existingUser=await userModel.findOne({username:username});
    if(existingUser) throw {message:"User Already Exists",statusCode:400}

    const existingEmail=await userModel.findOne({email:email});
    if(existingEmail) throw {message:"Email Already Exists",statusCode:400}

    const hashedPassword=await bcrypt.hash(password,10);

    const newuser=await userModel.create({
        username:username,
        email:email,
        password:hashedPassword
    });

    if(!newuser) throw {message:"user not Created Yet!",statusCode:404};

    const{password:pass,...rest}=newuser._doc;

    res.status(201).json({
        status:"Success",
        message:"User Created Successfully",
        user:rest
    });

}

module.exports=SignUp;