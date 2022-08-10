const petRouter = require('express').Router()

const PetController = require('../controllers/PetController')

const verifyToken = require('../helpers/VerifyToken')
const { imageUpload } = require('../helpers/UploadImage')

petRouter.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
petRouter.get('/', PetController.getPets)
petRouter.get('/mypets', verifyToken, PetController.getUserPets)
petRouter.get('/myadoptions', verifyToken, PetController.getUserAdoptions)
petRouter.get('/:id', PetController.getPetById)
petRouter.delete('/:id', verifyToken, PetController.removePetById)
petRouter.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)
petRouter.patch('/schedule/:id', verifyToken, PetController.schedule)

module.exports = petRouter