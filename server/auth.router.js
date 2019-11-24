const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const userController = require("./user.controller.js");
const jwt = require("jsonwebtoken");

const validationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

router.post("/verify", (req, res) => {
    const bearerHeader = req.headers["authorization"];
    if(!bearerHeader) return res.send(400);
    const token = bearerHeader.split(" ")[1];
    if(!token) return res.send(400);
    jwt.verify( token, process.env.JWT_KEY, (err, decoded) => {
        if(err) return res.status(401).send(err);
        res.status(200).send(decoded);
    });
});

//Login

router.post("/login", userController.login);

// Creates a new user

router.post("/signup", [
    check("email").isEmail().normalizeEmail(),
    check("password").isLength({ min: 8 }).withMessage("Must be atleast 8 characters long.")
    .matches(/\d/).withMessage("Must contain a number")
    .not().isIn(["12345678", "parool123", "password123"]).withMessage("Do not use a common word as the password")
], validationMiddleware, userController.signup);


module.exports = router;