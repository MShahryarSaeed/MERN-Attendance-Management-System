const leaveRequestModel = require("../../../models/leaveRequests.model");
const moment = require("moment");
const MakeLeaveRequest = async (req, res) => {

    const { reason, startDate, endDate } = req.body;
    const { userId } = req.params;

    if (req.user._id !== userId) {
        throw { message: "Unauthorized User", statusCode: 401 }
    }

    if (!reason) throw { message: "Reason for Leave is Required", statusCode: 400 };
    if (!startDate) throw { message: "Start Date is Required", statusCode: 400 };
    if (!endDate) throw { message: "End Date is Required", statusCode: 400 };

    if (!moment(startDate).isValid() || !moment(endDate).isValid()) {
        return res.status(400).json({ message: "Invalid Date Format" });
    }


    const newLeaveRequest = await leaveRequestModel.create({
        user: userId,
        reason: reason,
        startDate: moment(startDate).startOf('day').toDate(),
        endDate:moment(endDate).endOf('day').toDate()
    });

    if (!newLeaveRequest) throw { message: "Leave Request Not Created Yet!", statusCode: 404 };

    res.status(201).json({
        status: "Success",
        message: "Leave Request Created Successfully",
        leaveRequest: newLeaveRequest
    })
}

module.exports = MakeLeaveRequest;