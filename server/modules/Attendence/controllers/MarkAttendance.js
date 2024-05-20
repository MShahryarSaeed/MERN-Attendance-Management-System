const AttendenceModel = require("../../../models/Attendence.model");
const leaveRequestModel = require("../../../models/leaveRequests.model");

const MarkAttendance = async (req, res) => {

    // Check if attendance already marked for today
    const existingAttendence = await AttendenceModel.findOne({
        user: req.user._id,
        // date:new Date().toISOString().slice(0,10)
        date: {
            $gte: new Date().setHours(0, 0, 0, 0),
            $lt: new Date(new Date().setHours(0, 0, 0, 0) + 24 * 60 * 60 * 1000)
        }
    });

    if (existingAttendence) {
        throw { message: "Attendance Already Marked For Today", statusCode: 400 }
    }

    // Check for approved leave request for today
    const approvedLeave = await leaveRequestModel.findOne({
        user: req.user._id,
        startDate: { $lte: new Date() },
        endDate: { $gte: new Date() },
        status: "Approved"
    });

    let isPresent = true;
    let leaveId = null;

    if (approvedLeave) {
        isPresent = false;
        leaveId = approvedLeave._id;
    }

    const newAttendance = await AttendenceModel.create({
        user: req.user._id,
        isPresent,
        leave: leaveId
    });

    if (!newAttendance) throw { message: "Attendance Not Marked", statusCode: 400 }

    res.status(201).json({
        status: "Success",
        message: "Attendance Marked Successfully",
        attendance: newAttendance
    })


}

module.exports = MarkAttendance;