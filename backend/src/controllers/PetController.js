const Pet = require('../models/Pet')

const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')
const ObjectId = require('mongoose').Types.ObjectId

module.exports = class PetController {

    static async create(req, res) {

        const { name, age, weight, color } = req.body
        const images = req.files
        const available = true

        //validations
        if (!name) {
            return res.status(422).json({ message: 'The name is required!' })
        }
        if (!age) {
            return res.status(422).json({ message: 'The age is required!' })
        }
        if (!weight) {
            return res.status(422).json({ message: 'The weight is required!' })
        }
        if (!color) {
            return res.status(422).json({ message: 'The color is required!' })
        }

        if (images.length < 1) {
            return res.status(422).json({ message: 'The image is required!' })

        }

        //get a pet 
        const token = getToken(req)
        const user = await getUserByToken(token)

        //create a pet
        const pet = new Pet({
            name,
            age,
            weight,
            color,
            available,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phone: user.phone
            }
        })

        images.map(image => {
            pet.images.push(image.filename)
        })

        try {

            const newPet = await pet.save()
            res.status(201).json({ message: 'Pet cadastrado!', newPet })

        } catch (err) {
            res.status(500).json({ message: error })
        }

    }

    static async getPets(req, res) {

        const { orderBy } = req.query

        const order = !orderBy ? '-createdAt' : orderBy

        const pets = await Pet.find().sort(order)

        res.status(200).json({ pets })

    }

    static async getUserPets(req, res) {

        const { orderBy } = req.query

        const order = !orderBy ? '-createdAt' : orderBy

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'user._id': user._id }).sort(order)

        res.status(200).json({ pets })

    }

    static async getUserAdoptions(req, res) {

        const { orderBy } = req.query

        const order = !orderBy ? '-createdAt' : orderBy

        const token = getToken(req)
        const user = await getUserByToken(token)

        const pets = await Pet.find({ 'adopter._id': adopter._id }).sort(order)

        res.status(200).json({ pets })

    }

    static async getPetById(req, res) {

        const { id } = req.params

        if (!ObjectId.isValid(id)) {
            return res.status(422).json({ message: 'Invalid Id!' })
        }

        try {
            const pet = await Pet.findOne({ _id: id })
            res.status(200).json({ pet })
        } catch (err) {
            res.status(404).json({ message: 'Pet not found!' })
        }



    }

}