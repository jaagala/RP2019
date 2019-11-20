const User = require("./user.model.js");
const express = require("express");
const router = express.Router();


//Login

router.post("/login", (req, res) => {
    console.log("body", req.body);
    User.login(req.body)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.send(500);
        });
});

// Creates a new user

router.post("/signup", (req, res) => {
    User.signup(req.body)
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.send(500);
        });
});


module.exports = router;