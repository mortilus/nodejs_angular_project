const express = require("express");
const router = express.Router();
const Post = require('../models/post');

const checkAuth = require('../middleware/check-auth');

router.post('', checkAuth, (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
        creator: req.userData.userId
    });
    // console.log(req.userData);
    // return res.status(200).json({});
    post.save().then(createPost => {
        res.status(201).json({
            message: 'Post added successfully',
            post: {
                title: createPost.title,
                content: createPost.content,
                id: createPost.id,
                creator: createPost.creator
            },
        })
    });
});
router.put('/:id', checkAuth, (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    console.log(post);
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
        if (result.nModified > 0) {
            res.status(200).json({ message: 'updated successfully!' });
        } else {
            res.status(401).json({ message: 'Not authorized to update this post!' });
        }
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
    Post.findOne(({ _id: req.params.id })).then(result => {
        console.log(res);
        res.status(200).json(result);
    });
});
router.delete("/:id", checkAuth, (req, res, next) => {
    console.log(req.params.id);
    Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
        console.log(result);
        if (result.n > 0) {
            res.status(200).json({ message: 'Post deleted successfully!' });
        } else {
            res.status(401).json({ message: 'Not authorized to delete this post!' });
        }
    });
});


module.exports = router; 