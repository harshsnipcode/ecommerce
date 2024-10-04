const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const Product = require("../models/product-model"); 

router.get("/", function(req,res){
    let error = req.flash("error");
    res.render("index", {error});
});

router.get("/shop", isloggedin, async function(req, res) {
    try {
        const products = await Product.find(); // Fetch products from the database
        console.log(products);
        res.render("shop", { products }); // Pass products to the shop view
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/logout", isloggedin, async function(req, res){
    res.render("/");
})

module.exports = router;