import mongoose from 'mongoose'

export const connectdb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongodb connected ${conn.connection.host}`)
    }catch(error){
        console.error(error)
    }
}