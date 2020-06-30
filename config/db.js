const mongoose = require('mongoose')

// using async and when you work with mongoose you're working with promises 
// can also use .then
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            //adding options to avoid any warnings in the console
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })

        console.log(`MongoDB connected ${conn.connection.host}`)

    }
    catch (err) {
        console.error(err)
        process.exit(1)
    }
}

//in order to run in the server.js file 
module.exports = connectDB