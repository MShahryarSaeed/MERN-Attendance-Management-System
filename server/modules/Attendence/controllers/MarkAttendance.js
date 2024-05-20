const AttendenceModel = require("../../../models/Attendence.model");
const leaveRequestModel = require("../../../models/leaveRequests.model");
const moment = require("moment");

const MarkAttendance = async (req, res) => {

    const todayStart = moment().startOf('day').toDate();
    const todayEnd = moment().endOf('day').toDate();

    // Check if attendance already marked for today
    const existingAttendence = await AttendenceModel.findOne({
        user: req.user._id,
        // date:new Date().toISOString().slice(0,10)
        date: {
            $gte: todayStart,
            $lt: todayEnd
        }
    });

    if (existingAttendence) {
        throw { message: "Attendance Already Marked For Today", statusCode: 400 }
    }

    // Check for approved leave request for today
    const approvedLeave = await leaveRequestModel.findOne({
        user: req.user._id,
        startDate: { $lte: todayEnd },
        endDate: { $gte: todayStart },
        status: "approved"
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