const mongoose = require('mongoose')

async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        
    } catch (error) {
        
    }
}

module.exports = connectDb