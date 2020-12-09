const { json } = require("express");
const express = require("express");
const ImageModel = require("../Models/images.model");
const router= express.Router();
const path = require('path'); 
const multer =require("multer");

const storageFestOffer=multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./uploads/fest_offer/");
    },
    filename: (req,file,cb)=> {
        cb(null,"fest_offer"+".jpg");
    },
});

const uploadFestOffer=multer({
    storage: storageFestOffer,
});

const storageFoodType1=multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./uploads/food_type/");
    },
    filename: (req,file,cb)=> {
        cb(null,"food_type1"+".jpg");
    },
});


const storageFoodType2=multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,"./uploads/food_type/");
    },
    filename: (req,file,cb)=> {
        cb(null,"food_type2"+".jpg");
    },
});

const uploadFoodType1=multer({
    storage: storageFoodType1,
});

const uploadFoodType2=multer({
    storage: storageFoodType2,
});


router.route("/fest_offer").post(uploadFestOffer.single("img"),(req,res)=>{
    const image=new ImageModel({
        image:req.file.path,
        });
        image
        .save()
    .then(()=>{
        console.log("Image Saved");
        res.status(200).json({
            msg:"Image uploaded successfully"
        });
    })
    .catch((err)=>{
        res.status(500).send(err);
    });
});

router.route("/food_type1").post(uploadFoodType1.single("img"),(req,res)=>{
    const image=new ImageModel({
        image:req.file.path,
        });
        image
        .save()
    .then(()=>{
        console.log("Image Saved");
        res.status(200).json({
            msg:"Image uploaded successfully"
        });
    })
    .catch((err)=>{
        res.status(500).send(err);
    });
});

router.route("/food_type2").post(uploadFoodType2.single("img"),(req,res)=>{
    const image=new ImageModel({
        image:req.file.path,
        });
        image
        .save()
    .then(()=>{
        console.log("Image Saved");
        res.status(200).json({
            msg:"Image uploaded successfully"
        });
    })
    .catch((err)=>{
        res.status(500).send(err);
    });
});
module.exports = router;