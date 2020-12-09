const { json } = require("express");
const express = require("express");
const Account = require("../Models/account.model");
const config = require("../configure");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const router= express.Router();

//To retrive Data
router.route("/:mobile_number").get((req,res)=>{
    Account.findOne({mobile_number:req.params.mobile_number},(err, result)=>{
        if(err) return res.status(500).json({msg:err});
        res.json({
            data: result,
            mobile_number:req.params.mobile_number
        });
    });
});

//To Check User Aleready Exist or Not
router.route("/checkmobile/:mobile_number").get(async(req,res)=>{
    (async()=>{
        try{
            Account.findOne({mobile_number:req.params.mobile_number},(err, result)=>{
                if(result!==null){
                    return res.json({
                        Status:true
                    }); 
                }
                else return res.json({
                    Status:false
                });
            });
        }
        catch(error){
            return res.status(500).json({msg:error});
        }
    })();
});

//To register User
router.route("/register").post((req,res)=>{
    console.log("inside the register");
    const account = new Account({
        mobile_number:req.body.mobile_number,
        name:req.body.name,
        email:req.body.email,
    });
    account
    .save()
    .then(()=>{
        console.log("user registered");
        res.status(200).json("ok");
    })
    .catch((err)=>{
        res.status(403).json({msg: err});
    });
});

//To User Login
router.route("/login").post((req,res)=>{
    Account.findOne({mobile_number:req.body.mobile_number},(err,result)=>{
        if(err) return res.status(500).json({Status:false,msg:err});
        if(result===null){
            return res.json({
                Status:false
            });
        }
        else{
            //Creating a JsonWebToken
            let token = jwt.sign({mobile_number:req.body.mobile_number},config.key,
                {
                    expiresIn: "24h",
                });
            res.json({
                status:true,
                token:token,
                msg: "Successfully Logged In",
            });
        }
    });
});

module.exports=router;