const mongoose = require("mongoose");

const leaveRequestsSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ['pending', 'approved', 'rejected']
    }

}, {
    timestamps: true
})

const leaveRequestModel = mongoose.model("leaveRequests", leaveRequestsSchema);

module.exports = leaveRequestModel