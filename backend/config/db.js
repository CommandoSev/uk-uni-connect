const mongoose = require('mongoose');

const uri = "mongodb+srv://user123:pi4tennis@cluster0.vp0mc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const connectDB = async() => {
    try {
        const conn = await mongoose.connect(uri, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });

        console.log(`MongoDB Connected: ${conn}`);
    } catch (error) {
        console.log(error);
        process.exit();
    }
};

module.exports = connectDB;