import jwt from 'jsonwebtoken'
export const createtoken = (userid,res)=>{
    // generating a token
    const token = jwt.sign({ id: userid },process.env.JWT_SECRET,{
        expiresIn:"7d"
    })

    // sending it to the user in a cookie 
    res.cookie('jwt',token,{
        maxAge:7*24*60*60*1000,
        httpOnly: true,
        sameSite: "strict",
        secure:process.env.NODE_ENV!=='development'
    })
    return token

}
