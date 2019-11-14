//const User = require("./user.model.js");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//user.model.js

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    hash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

//Creates a new user

userSchema.statics.signup = function({email, password}){
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, 10, function(err, hash) {
            if(err) return reject(err);
            const user = new User({ email, hash });
            user.save(err =>{
                if (err) return reject(err);
                resolve(user);
            });
        });
    });
};

//checks if user exists

userSchema.statics.login = function ({ email, password }) {
    return new Promise((resolve, reject) => {
        this.findOne({email,}, (err, doc) =>{
            if(err) return reject(err);
            if(doc === null) return reject("User not found!");
            bcrypt.compare(password, doc.hash, function (err, result) {
                if(err) return reject(err);
                resolve(result);
            });
        });
    });
};


const User = mongoose.model("User", userSchema);
module.export = User;


//Gets all users

router.get("/api/users", (req, res) => {
    User.find({}, (err, docs) => {
        if(err) return handleError(err, res);
        res.status(200).json(docs);
    });
});

//Login

router.post("/api/users/login", (req, res) =>{
    console.log("body", req.body);
    User.login(req.body)
    .then(user =>{
        res.json(user);
    })
    .catch(err => {
        handleError(err, res);
    });
});

// Creates a new user

router.post("/api/users/signup", (req, res)=>{
    User.signup(req.body)
        .then(user =>{
            res.status(200).json(user);
        })
        .catch(err => {
            return handleError(err, res);
        });
});

//deletes all users

router.delete("/api/users", (req,res) => {
    User.deleteMany({}, (err, docs) => {
        if(err) return handleError(err, res);
        console.log(docs);
        console.log("Success delete many users");
        res.send(204);
    });
});

function handleError(err, res) {
    console.log(err);
    res.send(500);
}


module.exports = router;