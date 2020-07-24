const express = require('express');
const mongoose= require('mongoose');
const bcrypt = require("bcrypt");
const router =express.Router();

mongoose.connect("mongodb+srv://userlinus:techtips@cluster0.snu9d.mongodb.net/test");

const regSchema = new mongoose.Schema({
    user_name:String,user_email:String,user_password:String
});
const qwert = mongoose.model("qwert",regSchema);


router.get('/login',(req,res)=>{
    res.render('login');
});

router.post("/login",async (req,res)=>{
    const emailx = req.body.user_email;
    const passx = req.body.user_password;

    const f = await qwert.findOne({user_email:emailx});

    if(f){
        if(bcrypt.compareSync(passx,f.user_password)){
            req.session.userId = f.user_email;
            res.redirect("/dashboard");}
        else{
            res.send("Password Incorrect");
        }

           
    }else{
        res.send("Email not found");
    }
});

router.get('/register',(req,res)=>{
    res.render('register');
});


router.post("/register",async(req,res)=>{
    const user1 = new qwert({
        user_name:req.body.user_name,
        user_email:req.body.user_email,
        user_password:req.body.user_password
    });
    user1.user_password = await bcrypt.hash(user1.user_password,10);       
    await qwert.create(user1);
    res.redirect('/users/login');
});





module.exports = router;