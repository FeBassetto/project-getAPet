const mongoose = require('mongoose')

async function main() {
    try {
        await mongoose.connect('mongodb://localhost:27017/getapet')
        console.log('Connected to database')
    } catch (err) {
        console.log('Error connecting to database', err)
    }
}

main()

module.exports = mongoose