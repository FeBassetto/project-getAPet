const petRouter = require('express').Router()

const PetController = require('../controllers/PetController')

const verifyToken = require('../helpers/VerifyToken')
const { imageUpload } = require('../helpers/UploadImage')

petRouter.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
petRouter.get('/', PetController.getPets)
petRouter.get('/mypets', verifyToken, PetController.getUserPets)

module.exports = petRouter