const express=require("express");
// middlewares
const verifyUser=require("../../middlewares/verifyUser");
const AdminAuthorization=require("../../middlewares/AdminAuthorization");
const upload=require("../../middlewares/upload-image");
const updateProfile = require("./controllers/updateProfile");
const GetAllUsersByAdmin = require("./controllers/GetAllUsersByAdmin");

const userRoutes=express.Router();

userRoutes.get("/GetAllUsers",verifyUser,AdminAuthorization,GetAllUsersByAdmin);
userRoutes.put('/updateProfile/:userId',verifyUser,upload.single('profilePicture'),updateProfile);


module.exports=userRoutes;