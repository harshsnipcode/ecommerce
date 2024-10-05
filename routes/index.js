const express = require("express");
const router = express.Router();
const isloggedin = require("../middlewares/isLoggedin");
const Product = require("../models/product-model"); 
const userModel = require("../models/user-model");

router.get("/", function(req,res){
    let error = req.flash("error");
    res.render("index", {error, loggedin: false });
});

router.get("/shop", isloggedin, async function(req, res) {
    try {
        const products = await Product.find(); // Fetch products from the database
        console.log(products);
        let success= req.flash("success");
        res.render("shop", { products, success }); // Pass products to the shop view
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/cart", isloggedin, async function(req, res) {
    try {
        let user = await userModel.findOne({email: req.user.email}).populate("cart");
        const bill = (Number(user.cart[0].price)+20)-Number(user.cart[0].discount)
        const products = await Product.find(); // Fetch products from the database
        console.log(products);
        res.render("cart", { user, bill }); // Pass products to the shop view
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

router.get("/addtocart/:productid", isloggedin, async function (req, res){
    let user= await userModel.findOne({email: req.user.email});
    user.cart.push(req.params.productid);
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
})

router.get("/logout", isloggedin, async function(req, res){
    res.render("/");
})

module.exports = router;