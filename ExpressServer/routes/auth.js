require("dotenv").config()
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const GetUser = require("../MiddleWares/GetUser");

// SignUp Route
// POST:SignUp

router.post("/SignUp",[
    body('email',"please give a valid email").notEmpty().isEmail(),
    body('name',"name cannot be empty").notEmpty(),
    body('username',"username cannot be empty").notEmpty(),
    body('password',"password cannot be empty and should be atleast 5 characters").notEmpty().isLength({min:5})
],
    async(req,res)=>{

        // Getting Validation Results of /SignUp
        const result = validationResult(req);
        // If no validation issue
        if (result.isEmpty()) {

            // trycatch block
            try {

                // make sure that email doesn't already exists
                const data = await User.findOne({email:req.body.email}).exec()
                if (data) {
                    res.status(400).json({EmailExists:true,message:`Try another email instead of ${req.body.email}`})
                }
                else{

                    // else create user

                    const salt = bcrypt.genSaltSync(10);
                    const Password = bcrypt.hashSync(req.body.password, salt);
                    req.body.password=Password
                    const user = User(req.body)
                    user.save()


                    // and provide them with their JWT
                    const data = {
                        user:{id:user.id}
                    }
                    const jwAuthToken = jwt.sign(data, process.env.JWT_KEY);
                    res.status(201).json({userCreated:true,message:`User ${req.body.username} was successfullly created`,JWT:jwAuthToken})
                }

            } catch (error) {
                res.status(500).json({serverError:true,message:"internal server error occurred"})
            }
        }

        // sending errors if issue with validations
        else{res.status(400).send({InValidCreds:true ,errors: result.array() });}
    }


)


// SignIn Route
// POST:SignIn

router.post("/SignIn",[
    body('email',"please give a valid email").notEmpty().isEmail(),
    body('password',"password cannot be empty and should be atleast 5 characters").notEmpty().isLength({min:5})
],
    async(req,res)=>{

        // Getting Validation Results of /SignIn
        const result = validationResult(req);
        // If no validation issue
        if (result.isEmpty()) {
            // trycatch block
            try {
                // getting a user by email id
                const user = await User.findOne({email:req.body.email}).exec()

                // if exists
                if (user) {

                    // do the same check for password
                    const Pcompare =  bcrypt.compareSync(req.body.password,user.password)

                    // if check has no issue
                    if(Pcompare){

                        // signin and provide the JWT
                        const data = {
                            user:{id:user.id}
                        }
                        const jwAuthToken = jwt.sign(data, process.env.JWT_KEY);
                        res.status(201).json({userSignIn:true,message:`Welcome user ${user.username}`,JWT:jwAuthToken})
                    }

                    // else give the error
                    else{
                        res.status(400).json({userSignIn:false,message:"Please give the correct password"})
                    }
                }

                // else give error
                else{
                    res.status(400).json({userSignIn:false,message:"It looks like you do not have an account. Why not SignUp?"})
                }

            } catch (error) {
                res.status(500).json({serverError:true,message:"internal server error occurred"})
                console.log(error)
            }
        }

        // sending errors if issue with validations
        else{res.status(400).send({InValidCreds:true ,errors: result.array() });}
    }


)



// GetAUser Route
// GET:GetUser

router.get("/GetUser",//Giving the MiddleWare
    GetUser,
    // function to get the user
    async(req, res) => {
        try {
            uId = req.user.id;
            const useR = await User.findById(uId).select("-passWord")
            res.send(useR)
            } catch (error) {
                res.status(500).send({"error":"internal server error occurred"})
            }

    })
module.exports = router