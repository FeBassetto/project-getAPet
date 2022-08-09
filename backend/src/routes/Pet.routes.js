const petRouter = require('express').Router()

const PetController = require('../controllers/PetController')

const verifyToken = require('../helpers/VerifyToken')

petRouter.post('/create', verifyToken ,PetController.create)

module.exports = petRouter