const express=require("express");
const MarkAttendance = require("./controllers/MarkAttendance");
const verifyUser = require("../../middlewares/verifyUser");
const GetAttendancesByUser = require("./controllers/GetAttendancesByUser");
const AdminAuthorization = require("../../middlewares/AdminAuthorization");
const GetAttendanceReport = require("./controllers/GetAttendanceReport");
const CalculateGrade = require("./controllers/CalculateGrade");

const attendenceRoutes=express.Router();

// Routes
attendenceRoutes.get("/calculate",verifyUser,AdminAuthorization,CalculateGrade);
attendenceRoutes.get("/userAttendences",verifyUser,GetAttendancesByUser);
attendenceRoutes.get("/GetAttendanceReport",verifyUser,AdminAuthorization,GetAttendanceReport);
attendenceRoutes.post('/mark',verifyUser,MarkAttendance);



module.exports=attendenceRoutes;