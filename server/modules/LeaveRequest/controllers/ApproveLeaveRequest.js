const leaveRequestModel=require("../../../models/leaveRequests.model");

const ApproveLeaveRequest=async(req,res)=>{

    const {leaveRequestId}=req.params;

    const leaveRequest=await leaveRequestModel.findById(leaveRequestId);

    if(!leaveRequest){
        throw {message:"Leave Request Not Found",statusCode:404};
    }

    if(leaveRequest.status!=="pending"){
        throw {message:"Leave Request Already Approved or Rejected",statusCode:400};
    }

    leaveRequest.status="approved";

    await leaveRequest.save();

    res.status(200).json({message:"Leave Request Approved Successfully",statusCode:200});



}

module.exports=ApproveLeaveRequest;