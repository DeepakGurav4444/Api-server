const express = require("express");
const mongoose =require("mongoose");
const app = express();
const Port = process.env.PORT || 5000;
require('dotenv/config');

mongoose.connect('mongodb+srv://ApiUser:33372574@cluster0.lqlvg.mongodb.net/myapp?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology:true,
});

const connection = mongoose.connection;
connection.once("open",()=>{
    console.log("Mongodb connected");
});


app.use(express.json());
app.use("/uploads",express.static("uploads"));

const userRoute = require("./Routes/user");
app.use("/user",userRoute);

const accountRoute = require("./Routes/account");
app.use("/account",accountRoute);

const profileRoute =require("./Routes/profile");
app.use ("/profile",profileRoute);

const imagesRoute=require("./Routes/images");
app.use("/image",imagesRoute);

app.route("/").get((req,res)=>res.json("Your First Rest Api venom"));

app.listen(Port,()=>console.log('Your server is running on port ' +Port));