/*

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
        existingGrade.totalDays += 1; // Increment total days for each attendance record found

        userGrades[user._id] = existingGrade;
    }

    const gradedUsers = [];

    // for (const userId in userGrades) {
    //     const userGrade = userGrades[userId];
    //     // const attendancePercentage = (userGrade.totalPresent / attendanceRecords.length) * 100;
    //     const attendancePercentage = (userGrade.totalPresent / userGrade.totalDays) * 100;
    //     // const grade = attendancePercentage >= attendanceThreshold ? "Pass" : "Fail";
    //     const grade = attendancePercentage >= attendanceThreshold * 100 ? "Pass" : "Fail";

    //     gradedUsers.push({
    //         _id: userId,
    //         attendancePercentage,
    //         grade,
    //         leaveDaysUsed: userGrade.leaveDays,
    //     });
    // }

    for (const userId in userGrades) {
        const userGrade = userGrades[userId];
        
        // Debug: Log user grades to inspect values
        console.log(`User: ${userId}, Grades: ${JSON.stringify(userGrade)}`);

        const attendancePercentage = userGrade.totalDays > 0 
            ? (userGrade.totalPresent / userGrade.totalDays) * 100 
            : 0;
            
        const grade = attendancePercentage >= attendanceThreshold * 100 ? "Pass" : "Fail";

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

*/

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

    // Fetch all attendance records within the date range
    const attendanceRecords = await AttendenceModel.find(query).populate("user");

    const userGrades = {};

    for (const record of attendanceRecords) {
        const user = record.user;
        if (!userGrades[user._id]) {
            userGrades[user._id] = { totalPresent: 0, totalDays: 0, leaveDays: 0 };
        }
        const existingGrade = userGrades[user._id];

        existingGrade.totalPresent += record.isPresent ? 1 : 0;
        existingGrade.leaveDays += record.leave ? 1 : 0;
        existingGrade.totalDays += 1; // Increment total days for each attendance record found

        userGrades[user._id] = existingGrade;
    }

    const gradedUsers = [];

    for (const userId in userGrades) {
        const userGrade = userGrades[userId];

        // Debug: Log user grades to inspect values
        console.log(`User: ${userId}, Grades: ${JSON.stringify(userGrade)}`);

        const attendancePercentage = userGrade.totalDays > 0 
            ? (userGrade.totalPresent / userGrade.totalDays) * 100 
            : 0;

        const grade = attendancePercentage >= attendanceThreshold * 100 ? "Pass" : "Fail";

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
