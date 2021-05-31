const jwt = require('jsonwebtoken')
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, 'secrete');
    req.userData = decoded;
    next();
    }
    
    catch (err) {
        return res.status(401).json({
            meta: { status: '401', message: 'Token Expired' },
        })
    }
    
}