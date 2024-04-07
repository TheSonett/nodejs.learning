// const http = require("http");
// const fs = require("fs");

// import http from "http"; /// Only gonna work if we set "type": "module",
// import fs from "fs";

// const home = fs.readFileSync("./index.html");

// const server = http.createServer((req, res) => {
//     console.log("Server called!!");

//     if(req.url === "/") {
//         res.end("<h1>Burhhh!!</h1>");
//     }
//     else if(req.url === "/home") {
//         res.end(home);
//     }
// });

// server.listen(5000, () => {
//     console.log("Servver estabnlish");
// });


// by using express framework
import express from "express";
import path from "path";
import mongoose from "mongoose";

const app = express();
app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve(), "public"))); // for accessing the static files like html, css, we have to set this!
app.use(express.urlencoded({ extended: true}));

const users = [];

mongoose.connect("mongodb://localhost:27017", {
    dbName: "backend"
}).then(c=>console.log("Database connected!")).catch(e=>console.log(e));

const userShema = new mongoose.Schema({
    name: String,
    email: String
});

const data = mongoose.model("users", userShema);

app.get("/", (req, res)=> {
    //res.sendStatus(404);
    //res.sendFile(path.join(path.resolve(), "./index.html"));
    //res.render("index", {name: "Rahul"});
    res.render("index");
});

app.get("/success", (req, res)=> {
    res.render("success");
})

app.post("/submit", (req, res)=> {
    const [name, email] = [req.body.name, req.body.email];
    
    //users.push({name, email});
    data.create({name, email}).then(()=>console.log("Data added successfully!"));

    console.log(data.find());

    res.redirect("/success");
})

app.get("/getData", (req, res)=> {
    res.json({
        users
    });
});

app.listen(5000, ()=> {
    console.log("Server is working!");
})