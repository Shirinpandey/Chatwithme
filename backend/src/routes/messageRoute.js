import express from 'express'
import {displayusers} from '../controller/messagecontroller.js'
import { protectroute,getmessages,sendmessage } from '../middlewear/protectroute.js'
const messageRoute = express.Router()


messageRoute.get('/user',protectroute,displayusers)
messageRoute.get('/:id',protectroute,getmessages)


messageRoute.post('/send/:id',protectroute,sendmessage)






export default messageRoute