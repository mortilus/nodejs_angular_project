const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://mike:a1yc3Crf4PMfxuPv@cluster0-cn4gj.mongodb.net/node-angular?retryWrites=true&w=majority")
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
        "Origin, X-Requested-With, Content-TypeError, Accept, Content-Type"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

app.post('/api/posts', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    post.save();
    console.log(post);
    res.status(201).json({
        message: 'Success'
    });
});

app.use('/api/posts', (req, res, next) => {
    const posts = [
        {
            id: 'dasfadsf',
            title: 'Test title 1',
            content: 'Test content'
        },
        {
            id: 'dasfadsf',
            title: 'Test title 2',
            content: 'Test content'
        },
        {
            id: 'dasfadsf',
            title: 'Test title 3',
            content: 'Test content'
        },
    ];
    res.status(200).json(posts);
});

module.exports = app;


//a1yc3Crf4PMfxuPv