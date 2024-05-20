const mongoose=require("mongoose");

const AttendenceSchema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true
    },
    date:{
        type:Date,
        default:Date.now // Set default date to current date
    },
    isPresent:{
        type:Boolean,   
        required:true
    },
    leave:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"leaveRequests"
    },
    grade:{
        type:String,
        default:null
    }

},{
    timestamps:true
});

const AttendenceModel=mongoose.model("Attendences",AttendenceSchema);

AttendenceSchema.pre('save',async function(next){

    const existingAttendence=await AttendenceModel.findOne({user:this.user,date:this.date});

    if(existingAttendence){

        return next(new Error('Attendance already marked for this day'))

    }else{

        next();
    }

})



module.exports=AttendenceModel;