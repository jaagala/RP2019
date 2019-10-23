const express = require("express");
const router = express.Router();
//const DB = require("./database.js");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({ 
    imgSrc: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", productSchema);

//Creates a new product

router.post("/api/products", (req, res) => {
    const props = {
        imgSrc: "google.com",
        title: "red phone",
        price: 200,
        category: "phones"
    };
    const product1 = new Product(props);
    product1.save(err => {
        if (err) {
            console.log("Error: ", err);
            res.send(500);
            return;
        }
        console.log("Success create!");
        res.send(201);
    });
});

// Returns a product 

router.get("/api/products/:itemId", (req, res) => {
    //res.send(DB.getProduct(req.params.itemId));
    Product.findById(req.params.itemId, function (err, product) {
        if(err){
            console.log("Error:", err);
            res.status(500).send(err);
            return;
        }
        res.send(product);
    });
});

// Returns all items

router.get("/api/products", (req, res) => {
    //res.json(DB.getProducts());
    Product.find({}, function(err, products){
        if(err){
            console.log("Error:", err);
            res.status(500).send(err);
            return;
        }
        res.send(products);
    });
});



module.exports = router;