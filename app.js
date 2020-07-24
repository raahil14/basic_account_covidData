const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require('express-session');
const https = require('https');
const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10*1000,
      sameSite: true,
    },
  }));

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


//Listening to port
app.listen(3000,function(){
    console.log("Server started at port 3000");
});