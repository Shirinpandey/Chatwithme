import User from '../models/usermodel.js'
import Message from '../models/messagemodel.js'

export async function displayusers(req,res){
    try{
        const userid =req.user._id
        const filteredusers = await User.find({_id:{$ne: userid}}).select('-password')
        
        res.status(200).json(filteredusers)
    }
    catch(error){
        return res.status(500).json({message:'Error'})

    }
}

export async function getmessages(req,res){
    try{
        const {id:otherid} = req.params
        const senderid = req.user._id

        const messages = Message.find({
            $or:[
                {senderid: otherid,receiverid:senderid},
                {senderid: senderid,receiverid:otherid}
            ]})
        res.status(200).json(messages)

    }
    catch(error){
        return res.status(500).json({message:'Error'})

    }
}

export async function sendmessage(req,res){
    try{
        const {text,image} = req.body
        const {id:receiverid} = req.params
        const senderid = req.user._id

        let imageurl 

        if (image){
            const secureurl = await cloudinary.uploader.upload(image)
            imageurl = secureurl.secure_url
        }

        const newmessage = new Message({
            senderid,
            receiverid,
            text,
            image: imageurl
        })

        await newmessage.save()

        // realtime stuff goes here => socketio

        res.status(200).json({newmessage})

    }
    catch(error){
        return res.status(500).json({message:'Error'})

    }
}