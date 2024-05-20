const mongoose=require("mongoose");

const usersSchema=new mongoose.Schema({

    username:{
        type:String,
        required:[true,'username is Required'],
        unique:[true,'username already exists'],
        trim:true
    },
    email:{
        type:String,
        required:[true,'email is Required'],
        unique:[true,'email already exists'],
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:[true,'password is Required'],
        minlength:[6,'password must be at least 6 characters']
    },
    profilePicture:{
        type:String,
        default:"https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
        trim:true
    },
    role:{
        type:String,
        default:"user",
        enum:['user','admin']
    },
    leaveRequests:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"leaveRequests"
        }
    ]

},{
    timestamps:true
})

const userModel=mongoose.model("users",usersSchema);

module.exports=userModel