const express=require("express");
const SignUp = require("./controllers/SignUp");
const SignIn = require("./controllers/SignIn");
const Signout = require("./controllers/Signout");

const authRoutes=express.Router();

// Routes
authRoutes.post('/signup',SignUp);
authRoutes.post('/signin',SignIn);
authRoutes.post('/signout',Signout);

module.exports=authRoutes