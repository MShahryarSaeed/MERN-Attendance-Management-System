const AttendenceModel = require("../../../models/Attendence.model");

const GetAttendancesByUser=async(req,res)=>{

    const userId=req.user._id;
    const {startDate,endDate}=req.query;

    let query={
        user:userId
    }

    if(startDate && endDate){
        query.date={$gte:new Date(startDate) , $lte:new Date(endDate)}
    }else{
        query={
            user:userId
        }
    }

    const attendanceRecords=await AttendenceModel.find(query);
    //find method returns an array

    if(attendanceRecords.length===0){
        throw {message:"Attendances Not Found for this Time Period",statusCode:404}
    }

    res.status(200).json({
        status:"Success",
        message:"Attendances Found Successfully",
        attendances:attendanceRecords
    });

}

module.exports=GetAttendancesByUser;