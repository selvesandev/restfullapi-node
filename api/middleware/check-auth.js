const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        req.userData = jwt.verify(token, process.env.JWT_KEY);//verifies the token and returns the decoded.
        console.log(req.userData);
    } catch (err) {
        return res.status(401).json({
            'message': 'Auth Failed'
        })
    }


    // const decoded=jwt.decode();//decodes the base 64 encoded json web token
    next();
};