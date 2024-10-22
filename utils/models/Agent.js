import mongoose from "mongoose";

const agentSchema = new mongoose.Schema({
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
        default:false
    }

}, { timestamps: true });

export default mongoose.models.Agent || mongoose.model("Agent", agentSchema)