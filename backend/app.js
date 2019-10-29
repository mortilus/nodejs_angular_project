const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

const app = express();

mongoose.connect("mongodb+srv://mike:WTF3wfX1OHxcYZd6@cluster0-cn4gj.mongodb.net/node-angular?retryWrites=true&w=majority")
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
    post.save().then(createPost => {
        res.status(201).json({
            message: 'Post added successfully',
            postId: createPost._id
        })
    });
});

app.get('/api/posts', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json(documents);
            console.log(documents);
        });
});
app.delete("/api/posts/:id", (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post deleted"
        });
    });
});

module.exports = app;

//WTF3wfX1OHxcYZd6