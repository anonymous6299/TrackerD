
// All Imports
const express = require("express")
const router = express.Router()
const {body,validationResult} = require("express-validator")
const GetUser = require("../MiddleWares/GetUser")
const WorkTrack = require("../models/WorkTrack")



// Fetching All Data
// GET:GetData

router.get("/GetData",
    GetUser,
    async(req,res)=>{
        try {
            const data = await WorkTrack.find({user:req.user.id})
            if (data.length===0) {
                res.json({NoData:true,message:"You have not added any data yet."})
            }
            else{
                res.status(200).json({data})
            }
        } catch (error) {
            res.status(500).json({serverError:true,message:"Internal Sever Error"})
        }
    }
)



// Adding Data
// POST:AddData

router.post("/AddData",
    GetUser,
    [
        body("date","Please give a Date").notEmpty(),
        body("day","Please give a Day").notEmpty(),
        body("TasksCompleted","Please tell the amount of Tasks you Completed").notEmpty(),
        body("Tasks","Please tell the Tasks completed").notEmpty(),
    ],
    async(req,res)=>{
        const result = validationResult(req)
        if (result.isEmpty()) {
            try {
                const data = {
                    user:req.user.id,
                    date:req.body.date,
                    day:req.body.day,
                    TasksCompleted:req.body.TasksCompleted,
                    Tasks:req.body.Tasks
                }
                const Data = WorkTrack(data)
                const Sdata = await Data.save()
                res.status(201).json({DataAdded:true,message:`New data was added\n${Sdata}`})
            } catch (error) {
                res.status(500).json({serverError:true,message:"Internal Sever Error"})
            }
        }
        else{
            res.status(400).json({InValidData:true,errors:result.array()})
        }
    }
)


// Updating Data
// PUT:UpdData

router.put("/UpdData/:id",
    GetUser,
    async(req,res)=>{
            try {
                const {date,day,TasksCompleted,Tasks} = req.body
                const Data = {}
                if (date) {Data.date=date}
                if (day) {Data.day=day}
                if (TasksCompleted) {Data.TasksCompleted=TasksCompleted}
                if (Tasks) {Data.Tasks=Tasks}

                // Checking data to be updated exists
                const data = await WorkTrack.findById(req.params.id)
                if (!data) {
                    res.status(404).json({DataNotFound:true,message:"The data you tring to update does not exists"})
                } else {
                    if (data.user.toString()===req.user.id) {
                        const updData = await WorkTrack.findByIdAndUpdate(req.params.id,{$set:Data,new:true})
                        res.status(200).json({updated:true,message:`Record was Updated as follows:\n${updData}`})
                    } else {
                        res.status(401).json({unauthorized:true,message:"not allowed"})
                    }
                }
            } catch (error) {
                res.status(500).json({serverError:true,message:`Internal Sever Error ${error}`})
            }
        }
)


// Deleting Data
// DELETE:DelData

router.delete("/DelData/:id",
    GetUser,
    async(req,res)=>{
            try {


                // Checking that data to be deleted exists
                const data = await WorkTrack.findById(req.params.id)
                if (data) {
                    if (data.user.toString()===req.user.id) {
                        const DelData = await WorkTrack.findByIdAndDelete(req.params.id)
                        res.status(200).json({Deleted:true,message:`The Record ${DelData} was deleted successfully`})                
                    } else {
                        res.status(401).json({unauthorized:true,message:"not allowed"})
                    }
                } else {
                    res.status(404).json({NotFound:true,message:"Data to be deleted does not exists"})
                }
            } catch (error) {
                res.status(500).json({serverError:true,message:"Internal Sever Error"})
            }
        }
)
module.exports = router
