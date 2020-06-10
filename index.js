const express = require("express");
const myUpload = express();
const multer = require("multer");

myUpload.set("view engine", "ejs");

myUpload.get("/", (req, res) => {
    res.render("index");
});

myUpload.listen(8080, () => {
    console.log("MyUpload is running!");
});