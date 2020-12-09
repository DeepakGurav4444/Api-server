const { json } = require("express");
const express = require("express");
const Profile=require("../Models/profile.model");
const middleware = require("../middleware");
const { route } = require("./user");
const router= express.Router();

router.route("/add").post(middleware.checkToken,(req,res)=>{
    const profile =Profile(
        {
            username:req.decoded.username,
            name:req.body.name,
            profession:req.body.profession,
            DOB:req.body.DOB,
            titleline:req.body.titleline,
            about:req.body.about,
        }
    );
    profile.save()
    .then(()=>{
        return res.json({msg:"profile succesfully stored"});
    })
    .catch((err)=>{
        return res.status(400).json({err:err});
    });
});
module.exports = router;