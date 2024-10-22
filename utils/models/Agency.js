import mongoose from "mongoose";

const agencySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter your name"]
    },
    email:{
        type:String,
        required:[true,"Please enter your name"],
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:true
    }
},{timeStamps:true}

)


export default mongoose.models.Agency || mongoose.model("Agency", agencySchema)