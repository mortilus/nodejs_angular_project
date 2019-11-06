const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { //middleware in node express
    try {
        const token = req.headers.authorisation;
        console.log("Passed token " + token);
        const decodedToken = jwt.verify(token, 'my_secret');
        req.userData = { email: decodedToken.email, userId: decodedToken.userId };
        next();
    } catch(error) {
        res.status(401).json({
            message: 'Not able to get the token or invalid!'
        })
    }
}