const express = require("express");
const router = express.Router();
const Post = require('../models/post');

router.post('', (req, res, next) => {
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
router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({
            message: 'updated successfully!'
        });
    });
});
router.get('', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json(documents);
            console.log(documents);
        });
});
router.get('/:id', (req, res, next) => {
    Post.findOne(({_id: req.params.id})).then(result => {
        console.log(res);
        res.status(200).json(result);
    });
});
router.delete("/:id", (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({
            message: "Post deleted"
        });
    });
});


module.exports = router; 