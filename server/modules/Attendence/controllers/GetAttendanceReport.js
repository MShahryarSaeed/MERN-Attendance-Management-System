const AttendenceModel = require("../../../models/Attendence.model");

const GetAttendanceReport = async (req, res) => {

    const { startDate, endDate } = req.query;

    let query = {};

    if (startDate && endDate) {

        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) }

    } else {

        query = {}

    }

    const attendanceRecords = await AttendenceModel.find(query).populate("user", "username email profilePicture");

    if (!attendanceRecords.length) {

        throw { message: "Attendances Not Found for this Time Period", statusCode: 404 }
    }

    const reportData = {
        startDate: startDate,
        endDate: endDate,
        attendances: attendanceRecords.map((record) => ({
            user: record.user.username,
            email: record.user.email,
            profilePicture: record.user.profilePicture,
            date: record.date.toISOString().slice
                (0, 10),
            isPresent: record.isPresent,
            leave: record.leave ? record.leave._id : null,

        }))
    }


    res.status(200).json({

        status: "Success",

        message: "Attendances Found Successfully",

        report: reportData

    })

}

module.exports = GetAttendanceReport;