import express from 'express'
import {login,logout,signup,updateprofile,checkuser} from '../controller/Authcontroller.js'
import {protectroute} from "../middlewear/protectroute.js"
const router = express.Router()

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.put('/update-profile',protectroute,updateprofile)

router.get('/check',protectroute,checkuser)
export default router
