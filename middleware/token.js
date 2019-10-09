const jwt = require('jsonwebtoken');

module.exports = function verifyToken(req, res, next){
    console.log(req.body)
    const token = req.body.token
    if (token) {
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err){
                return res.status(401).json({
                    verifyToken: false,
                    responseCode: "401",
                    responseMessage: "Failed to authenticate"
                });
            }
            req.decoded = decoded;
            next();
        });
    } else {
        return res.status(404).json({
            verifyToken: false,
            responseCode: "404",
            responseMessage: "No token provided"
        })
}
}