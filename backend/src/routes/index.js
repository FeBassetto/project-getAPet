const router = require('express').Router()

const userRouter = require('./User.routes')
const petRouter = require('./Pet.routes')

router.use('/users', userRouter)
router.use('/pets', petRouter)

module.exports = router
