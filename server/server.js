const userRouter = require("./user.router.js");
const itemRouter = require("./item.router.js");
const authRouter = require("./auth.router.js");
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");

const DB_URL = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASS + "@cluster0-3hzec.mongodb.net/" + process.env.DB_NAME + "?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/", userRouter);
app.use("/api/v1/", itemRouter);

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../dist", "index.html"));
});
app.use(express.static("dist"));

function listen(){
    app.listen(PORT, () => {
        console.log("Server started", PORT);
        console.log("http://localhost:" + PORT);
    });
}

mongoose.connect(DB_URL)
    .then(() => {
        console.log("Database access success!");
        listen();
    })
    .catch(() => {
        console.error("Error happend");
    });

if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}
