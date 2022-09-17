const { underline } = require('colors')
const mongoose = require('mongoose')

module.exports.connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDb Connected: ${conn.connection.host}`.cyan , underline)
    } catch(error) {
        console.log(`Error: ${eroor.message}`.red.underline.bold)
        process.exit(1)
    }
}