const express = require('express');
const router =express.Router();
const https = require('https');
const { getCode, getName } = require('country-list');

router.get('/',(req,res)=>{
    res.render('welcome');
});

const redirectLogin = (req, res, next) => {
    if (!req.session.userId) {
      res.redirect('/users/login');
    } else {
      next();
    }
};

router.get('/dashboard',redirectLogin ,async(req,res)=>{
    res.render('dashboard');
});

router.post('/dashboard',async(req,res)=>{
    const query = req.body.countryName;
    const qCode=getCode(query);

    const url = "https://api.thevirustracker.com/free-api?countryTotal=" + qCode;
    https.get(url,(response)=>{
        response.on("data",function(data){
            const covidData = JSON.parse(data);
            const total = covidData.countrydata[0].total_cases;
            const deaths = covidData.countrydata[0].total_deaths;
            const recovered = covidData.countrydata[0].total_recovered;
            res.render("covdata",{query,total,deaths,recovered});
        })

    })});




module.exports = router;