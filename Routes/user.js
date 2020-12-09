const { json } = require("express");
const express = require("express");
const User = require("../Models/user.model");
const config = require("../configure");
const jwt = require("jsonwebtoken");
const middleware = require("../middleware");
const router= express.Router();


//TO Retrieve Data
router.route("/:username").get(middleware.checkToken,(req,res)=>{
    User.findOne({username:req.params.username},(err, result)=>{
        if(err) return res.status(500).json({msg:err});
        res.json({
            data: result,
            username:req.params.username
        });
    });
});

//To Check User Aleready Exist or Not
router.route("/checkusername/:username").get(async(req,res)=>{
    (async()=>{
        try{
            User.findOne({username:req.params.username},(err, result)=>{
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
    const user = new User({
        username:req.body.username,
        password:req.body.password,
        email:req.body.email,
    });
    user
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
    User.findOne({username:req.body.username},(err,result)=>{
        if(err) return res.status(500).json({msg:err});
        if(result===null){
            res.status(403).json("Username or Password is incorrect");
        }
        if(result.password===req.body.password){
            //Creating a JsonWebToken
            let token = jwt.sign({username:req.body.username},config.key,
                {
                    expiresIn: "24h",
                });
            res.json({
                token:token,
                msg: "Successfully Logged In",
            });
        }
        else{
            res.status(403).json("incorrect password");
        }
    });
});

//To update Data
router.route("/update/:username").patch(middleware.checkToken,(req,res)=>{
    User.findOneAndUpdate(
        {username:req.params.username},
        {$set:{ password: req.body.password,
                email:req.body.email,
        }},
        (err, result)=>{
            if(err) return res.status(500).json({msg: err});
            const msg={
                msg:"password successfully updated",
                username:req.params.username,
            };
            return res.json(msg);
        }
    );
});

//To delete User
router.route("/delete/:username").delete(middleware.checkToken,(req,res)=>{
    User.findOneAndDelete(
        {username:req.params.username},
        (err,result)=>{
            if(err) return res.status(500).json({msg:err});
            const msg ={
                msg: "user deleted",
                username: req.params.username,
            };
            return res.json(msg);
        });
});

module.exports = router;