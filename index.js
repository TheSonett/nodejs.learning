const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const port = 5000;

// setting middlewares
app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve() + '/views')));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend"
}).then(()=>console.log("Database connected!")).catch(e=>console.log(e));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("users", userSchema);

const isAuthenticated = async (req, res, next) => {
    const {token} = req.cookies;

    if(token) {
        const decodedData = jwt.verify(token, "daefrsgsrgssf");
        req.user = await User.findById(decodedData);

        next();
    }
    else {
        res.redirect("/login");
    }
}

app.get("/", isAuthenticated, (req, res) => {
    res.render("logout", {name: req.user.name});
});

app.get("/logout", (req, res)=> {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
    });
    res.redirect("/");
});

app.get("/register", (req, res)=> {
    res.render("register");
});

app.get("/login", (req, res) => {
    res.render("login", {message: ""});
})

app.post("/login", async (req, res)=> {
    const {email, password} = req.body;

    let user = await User.findOne({email});
    if(!user) return res.redirect("/register");

    //const isMatch = user.password === password;
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.render("login", {message: "Incorrect Password!"});

    const token = jwt.sign({_id: user._id}, "daefrsgsrgssf");

    res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 60 * 1000),
    });

    res.redirect("/");
});


app.post("/register", async (req, res) => {
    const {name, email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, password:hashedPassword });

    res.redirect("/login");
});

app.listen(port, ()=> {
    console.log(`Serving is running on port number: ${port}`);
});