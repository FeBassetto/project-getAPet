const jwt = require('jsonwebtoken')

const createUserToken = async (user, req, res) => {

    //create token
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, "thesecrettoken")

    //return token
    res.status(200).json({
        message: 'User is authenticated!',
        token,
        userId: user._id
    })

}

module.exports = createUserToken