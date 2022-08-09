const jwt = require('jsonwebtoken')
const getToken = require('./GetToken')

const checkToken = (req, res, next) => {

    try {
        const token = getToken(req)

        try {
            const verified = jwt.verify(token, 'thesecrettoken')
            req.user = verified
            next()

        } catch (err) {
            return res.status(401).json({ message: "Invalid Token!" })
        }
        
    } catch (err) {
        return res.status(401).json({ message: "Access denied!" })
    }

}

module.exports = checkToken