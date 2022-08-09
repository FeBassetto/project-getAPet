const express = require('express')
const cors = require('cors')
const router = require('./routes')
const conn = require('./db/conn')

const app = express()

app.use(express.json())

app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))

app.use(router)

app.listen(5000, () => {
    console.log('Server running on port 5000')
})