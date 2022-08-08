const router = require('express').Router()

const userRouter = require('./User.routes')

router.use('/users', userRouter)

module.exports = router
