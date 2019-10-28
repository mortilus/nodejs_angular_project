const express = require('express');
const bodyParser = require('body-parser');

const app = express();
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
    const post = req.body;
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
