const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model")

router.get("/", function(req,res){
    res.send("hey it's working");
});

if(process.env.NODE_ENV ==="development"){
    router.post("/create", async function(req,res){
        let owners = await ownerModel.find();
        if(owners.length>0){
            return res
              .send(503)
              .send("You don't have permission to create a new owner");
        }
        let {fullname, email, password}= req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner);
    })

}



module.exports= router;