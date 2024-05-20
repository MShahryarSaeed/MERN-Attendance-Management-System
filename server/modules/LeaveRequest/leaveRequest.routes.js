const express=require("express");
const MakeLeaveRequest = require("./controllers/MakeLeaveRequest");
const verifyUser=require("../../middlewares/verifyUser");
const AdminAuthorization=require("../../middlewares/AdminAuthorization");
const ApproveLeaveRequest = require("./controllers/ApproveLeaveRequest");
const DisApproveLeaveRequest = require("./controllers/DisApproveLeaveRequest");
const leaveRequestRoutes=express.Router();

leaveRequestRoutes.post('/makeleave/:userId',verifyUser,MakeLeaveRequest);
leaveRequestRoutes.put('/ApproveLeaveRequest/:leaveRequestId',verifyUser,AdminAuthorization,ApproveLeaveRequest)
leaveRequestRoutes.put('/DisApproveLeaveRequest/:leaveRequestId',verifyUser,AdminAuthorization,DisApproveLeaveRequest);


module.exports=leaveRequestRoutes;