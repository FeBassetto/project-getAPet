const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const createUserToken = require('../helpers/CreateUserToken')
const getToken = require('../helpers/GetToken')
const getUserByToken = require('../helpers/GetUserByToken')

module.exports = class UserController {

    static async register(req, res) {

        const { name, email, phone, password, confirmpassword } = req.body

        //validations
        if (!name) {
            res.status(422).json({ message: 'The name is required!' })
            return
        }
        if (!email) {
            res.status(422).json({ message: 'The email is required!' })
            return
        }
        if (!phone) {
            res.status(422).json({ message: 'The phone is required!' })
            return
        }
        if (!password) {
            res.status(422).json({ message: 'The password is required!' })
            return
        }
        if (!confirmpassword) {
            res.status(422).json({ message: 'The password confirmation is required!' })
            return
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: 'The password confirmation is different from the password!' })
            return
        }

        //check if user exists
        const userExists = await User.findOne({ email: email })

        if (userExists) {
            res.status(422).json({ message: 'User with this email already exists!' })
            return
        }

        // create a password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        //create a User
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        })

        try {

            const newUser = await user.save()

            await createUserToken(newUser, req, res)

        } catch (err) {
            res.status(500).json({ message: err })
        }

    }

    static async login(req, res) {

        const { email, password } = req.body

        //validations
        if (!email) {
            return res.status(422).json({ message: 'The email is required' })
        }

        if (!password) {
            return res.status(422).json({ message: 'The password is required' })
        }

        //check if user exists
        const user = await User.findOne({ email: email })

        if (!user) {
            return res.status(422).json({ message: 'No user registered with this email!' })
        }

        //check if password match with db
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            return res.status(422).json({ message: 'invalid password' })
        }

        await createUserToken(user, req, res)

    }


    static async checkUser(req, res) {

        let currentUser

        if (req.headers.authorization) {

            const token = getToken(req)
            const decoded = jwt.verify(token, 'thesecrettoken')

            currentUser = await User.findById(decoded.id)

            currentUser.password = undefined

        } else {
            currentUser = null
        }

        res.status(200).send(currentUser)

    }

    static async getUserById(req, res) {

        const { id } = req.params

        let user

        try {
            user = await User.findById(id).select('-password')
        } catch (err) {
            user = false
        }

        if (!user) {
            return res.status(422).json({ message: 'User not found!' })
        }

        res.status(200).json({ user })

    }

    static async editUser(req, res) {

        const { id } = req.params
        const { name, email, phone, password, confirmpassword } = req.body

        const token = getToken(req)
        const user = await getUserByToken(token)

        if (req.file) {
            user.image = req.file.filename
        }

        if (id !== user.id) {
            return res.status(422).json({ message: 'The user id is  incorrect' })
        }

        try {
            await User.findById(id)
        } catch (err) {
            return res.status(422).json({ message: 'User not found!' })
        }

        //validations
        if (!name) {
            res.status(422).json({ message: 'The name is required!' })
            return
        }

        user.name = name

        if (!email) {
            res.status(422).json({ message: 'The email is required!' })
            return
        }

        let userExists

        try {
            userExists = await User.findOne({ email: email })
        } catch (err) {
            userExists = false
        }

        if (userExists && user.email !== email) {
            res.status(422).json({ message: 'This email is already in use!' })
            return
        }

        user.email = email

        if (!phone) {
            res.status(422).json({ message: 'The phone is required!' })
            return
        }

        user.phone = phone

        if (password !== confirmpassword) {
            res.status(422).json({ message: 'The password confirmation is different from the password!' })
            return
        } else if (password === confirmpassword && password != null) {

            const salt = await bcrypt.genSalt(12)
            const passwordHash = await bcrypt.hash(password, salt)

            user.password = passwordHash

        }


        try {
            await User.findOneAndUpdate({ _is: user._id }, { $set: user }, { new: true })
            res.status(200).json({ message: 'User updated with success!' })
        } catch (err) {
            return res.status(500).json({ message: err })
        }

    }

}