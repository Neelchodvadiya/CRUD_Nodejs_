const router = require("express").Router();
const auth = require("../middleware/auth");
const chapter = require("../models/auth.models");
const xlsx = require("xlsx");

const {
    userReg,
    userlogin,
    userLogout
} = require("../controller/auth.controller");
// const { Router } = require("express");
// const route = require("color-convert/route");

router.post("/register",userReg);
router.post("/login",userlogin);
router.get("/logout", auth,userLogout);
router.patch("/:id",async  (req,res) =>{
    try {
        const _id= req.params.id;
        const updatechap = await chapter.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        // res.send(updatechap);
       

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"did not update"
        })
    }
}  )

router.get("/db",async(req,res)=>{
    try {
        const showdata = await chapter.find({});
    res.send(showdata);
    } catch (error) {
        
    }
    
})

router.delete("/:id",async  (req,res) =>{
    try {
        const _id= req.params.id;
     
        const updatechap = await chapter.findByIdAndDelete(req.params.id,{
            new:true
        });

        if (!req.params.id) {
            res.status(400).json({
                message:"wrong id"
            })
            
        } else {
            
            res.status(200).json({
                message:"successfull deleted record"
            })
        }

    } catch (error) {
        console.log(error);
        res.status(400).json({
            message:"did not deleted"
        })
    }
}  )

module.exports = router;


