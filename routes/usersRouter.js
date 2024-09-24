const express = require('express');
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const{
    registerUser,
    loginUser,
    logout,
}= require("../controllers/authController");
const userModel = require('../models/user-model');

router.get("/", function(req,res){
    res.send("hey it's working");
});

router.post("/register",  registerUser)

router.post("/login", loginUser);

router.get("/logout", logout);
module.exports= router;