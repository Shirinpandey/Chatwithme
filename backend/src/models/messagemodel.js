import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    senderid: {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User",
    },
    receiverid:{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref: "User",        
    },
    text:{
        type: String 
    },
    image:{
        type: String
    }


},{timestamps:true})


const Message = mongoose.model("Message",MessageSchema)

export default Message