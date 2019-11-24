const User = require("./user.model.js");
const express = require("express");
const router = express.Router();

//Gets all users

router.get("/get", (req, res) => {
    User.find({}, (err, docs) => {
        if(err) return handleError(err, res);
        res.status(200).json(docs);
    });
});

//deletes all users

router.delete("/delete", (req,res) => {
    User.deleteMany({}, (err, docs) => {
        if(err) return handleError(err, res);
        console.log(docs);
        console.log("Success delete many users");
        res.send(204);
    });
});

function handleError(err, res) {
    console.log(err);
    res.sendStatus(500);
}


module.exports = router;