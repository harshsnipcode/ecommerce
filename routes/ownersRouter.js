const express = require('express');
const router = express.Router();
const ownerModel = require("../models/owner-model");

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



router.get("/admin", function(req, res) {
    // You can initialize success as an empty string or a message
    let success = req.flash('success') || ''; // If you're using flash messages
    res.render("createproducts", { success });
});




module.exports= router;