const Pet = require('../models/Pet')


module.exports = class PetController {

    static async create(req, res) {

        const { name, age, weight, color } = req.body
        const images = req.files
        const available = true

        const getToken = require('../helpers/GetToken')
        const getUserByToken = require('../helpers/GetUserByToken')

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

        if(images.length < 1) {
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
            res.status(201).json({message: 'Pet cadastrado!', newPet})

        } catch (err) {
            res.status(500).json({message: error})
        }

    }

}