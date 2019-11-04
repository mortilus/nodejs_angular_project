const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { //middleware in node express
    try {
        const token = req.headers.authorisation;
        console.log("Passed token " + token);
        jwt.verify(token, 'my_secret');
        next();
    } catch(error) {
        res.status(401).json({
            message: 'Not able to get the token!'
        })
    }
}


//authorization