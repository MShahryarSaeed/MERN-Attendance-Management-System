require("dotenv").config();
require("express-async-errors");
const express=require("express");
const colors=require("colors");
const cookieParser=require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./handlers/errorHandler");
const authRoutes = require("./modules/Auth/auth.routes");
const userRoutes = require("./modules/users/user.routes");
const attendenceRoutes = require("./modules/Attendence/attendence.routes");
const leaveRequestRoutes=require("./modules/LeaveRequest/leaveRequest.routes");

const app=express();

// middlewares
app.use(express.json());
app.use(cookieParser());


// Connection
connectDB();

// models

// Routes
app.use('/api/auth',authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/attendances",attendenceRoutes);
app.use("/api/leaverequests",leaveRequestRoutes)


// errorHandler
app.use(errorHandler)


app.listen(process.env.PORT,()=>console.log(colors.blue(`Server is Listening on http://localhost:${process.env.PORT}`)));