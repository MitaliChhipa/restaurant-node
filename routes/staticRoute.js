const express = require('express');
const router = express.Router();
const dish = require('../models/dish')

router.get('/signup',(req,res)=>{
    res.render("signup");
})
router.get('/login',(req,res)=>{
    res.render("login");
})

module.exports = router