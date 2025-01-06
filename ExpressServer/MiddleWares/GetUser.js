const jwt = require('jsonwebtoken');
require("dotenv").config()


const GetUser = (req,res,next) =>{
    // Getting User by JWT
    const ReqToken=req.header("auth-token");
    if (ReqToken) {
        try {
            const data = jwt.verify(ReqToken,process.env.JWT_KEY)
            req.user = data.user;
            next();
        } catch (error) {
            res.status(500).json({serverError:true,message:"internal server error occurred"})
        }
    } else {
        res.status(401).json({ValidToken:false,error:"access denied.Give a valid token"})
    }
}
module.exports = GetUser