import express from "express"
import authRoute from "./routes/Authroute.js"
import messageRoute from './routes'
import dotenv from 'dotenv'
import {connectdb} from './lib/db.js'
import cookieParser from "cookie-parser"

dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth',authRoute)
app.use('/api/message',messageRoute)
app.listen(5000,()=>
    {console.log('Port running at server 5000')
    connectdb()})