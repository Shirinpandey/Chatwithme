import User from '../models/usermodel.js'
import bcrypt from 'bcrypt'
import {createtoken} from '../lib/utils.js'
import cloudinary from '../lib/cloudinary.js'

// we are sending the token back in cookies which is used 
export const signup = async (req,res)=>{
    const {email,fullName,password}=req.body

    try{
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be more than 6 characters' })
        }
        const checkemail = await User.findOne({email})
        if (checkemail){
            return res.status(400).json({message:'User already exists'})
        
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newuser = new User({email:email,fullName:fullName,password:hashedPassword})
        if (newuser) {
            createtoken(newuser._id,res)
            await newuser.save()
            console.log("User Created")
            res.status(201).json({ message: "User created", user:newuser });
        }
        else{
            return res.status(400).json({message:'Invalid User Data'})
        }        
    }
    catch(error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

export const login = async (req,res)=>{
    const {email,password} = req.body
    try{
        const user = await User.findOne({email})
        if (!user){
            return res.status(400).json({message:'Invalid Credentials'})
        }

        const rightpassword = await bcrypt.compare(password,user.password)
        if (!rightpassword){
            return res.status(400).json({message:'Invalid Credentials'})
        }

        createtoken(user._id,res)
        res.status(200).json({ message: "Sucessfully logged in", user:user })
        
    }
    catch(error){
        return res.status(500).json({message:'Error'})
    }


 
  
}

export const logout = (req,res)=>{
    try{
        res.clearCookie('jwt', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'Strict' });
        res.status(200).json({ message: "Sucessfully logged out"})

    }
    catch(error){
        return res.status(500).json({message:'Error'})
    }
  
}

export const updateprofile = async (req,res)=>{
    try{
        const {profilepic} = req.body
        // as we have req.user already set up in middleware
        const userid = req.user._id

        if (!profilepic){
            return res.status(400).json({message:'No profile picture added'})
        }

        const uploadresponse = await cloudinary.uploader.upload(profilepic)
        const updateduser = await User.findByIDandUpdate(userid,{profilepic:uploadresponse.secure_url},{new:True})
        return res.status(200).json({message:'Profile picture added',user:updateduser})

    }
    catch(error){
        return res.status(500).json({message:error})
        
    }
    
}


export const checkuser = async (req,res)=>{
    try{
        // already have this in the middleware hence can use req.user - no need to check user id again 
        return res.status(200).json(req.user)
    }
    catch(error){
        return res.status(500).json({message:'Error'})
    }


}