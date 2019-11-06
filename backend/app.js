const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.disable("x-powered-by");

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

mongoose.connect("mongodb+srv://mike:WTF3wfX1OHxcYZd6@cluster0-cn4gj.mongodb.net/node-angular")
    .then(() => {
        console.log("Connected to the database");
    })
    .catch(() => {
        console.log("Something wrong occured! ");
    });

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-TypeError, Accept, Content-Type, Authorisation"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use('/api/posts', postsRoutes);
app.use('/api/user', userRoutes);



module.exports = app;

//WTF3wfX1OHxcYZd6