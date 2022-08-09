const userRouter = require('express').Router()

const UserController = require('../controllers/UserController') 

const verifyToken = require('../helpers/VerifyToken')

userRouter.post('/register', UserController.register)
userRouter.post('/login', UserController.login)
userRouter.get('/checkUser', UserController.checkUser)
userRouter.get('/:id', UserController.getUserById)
userRouter.patch('/edit/:id', verifyToken ,UserController.editUser)

module.exports = userRouter