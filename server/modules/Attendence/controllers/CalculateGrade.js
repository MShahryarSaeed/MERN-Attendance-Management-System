const userModel = require("../../../models/user.model");
const AttendenceModel = require("../../../models/Attendence.model");

const CalculateGrade = async (req, res) => {

    const { startDate, endDate } = req.query || {};

    const attendanceThreshold = 0.8; // Minimum attendance percentage for a passing grade (e.g., 80%)
    const allowedLeaveDays = 5; // Maximum allowed leave days for the period

    let query = {};
    if (startDate && endDate) {
        query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const attendanceRecords = await AttendenceModel.find(query).populate("user");

    const userGrades = {};

    for (const record of attendanceRecords) {
        const user = record.user;
        const existingGrade = userGrades[user._id] || { totalPresent: 0, leaveDays: 0 }; // Initialize user grade object if not already present

        existingGrade.totalPresent += record.isPresent ? 1 : 0;
        existingGrade.leaveDays += record.leave ? 1 : 0;

        userGrades[user._id] = existingGrade;
    }

    const gradedUsers = [];

    for (const userId in userGrades) {
        const userGrade = userGrades[userId];
        const attendancePercentage = (userGrade.totalPresent / attendanceRecords.length) * 100;
        const grade = attendancePercentage >= attendanceThreshold ? "Pass" : "Fail";

        gradedUsers.push({
            _id: userId,
            attendancePercentage,
            grade,
            leaveDaysUsed: userGrade.leaveDays,
        });
    }

    res.status(200).json({ status: "Success", data: gradedUsers });


}

module.exports = CalculateGrade;