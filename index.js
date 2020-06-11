const express = require("express");
const myUpload = express();
const multer = require("multer");
const session = require("express-session");
const flash = require("connect-flash");

//View engine
myUpload.set("view engine", "ejs");

//Session
myUpload.use(session({
    secret: "myUpload", cookie: { maxAge: 600000 },
    saveUninitialized: true,
    resave: true
}));

myUpload.use(flash());

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "files/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

myUpload.get("/", (req, res) => {
    res.render("index", { fileUploaded: req.flash("fileUploaded") });
});

myUpload.post("/upload", upload.single("file"), (req, res) => {
    req.flash("fileUploaded", true);
    res.redirect("/");
});

myUpload.listen(8080, () => {
    console.log("MyUpload is running!");
});