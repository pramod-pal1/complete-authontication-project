const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/internshalaProject';
        await mongoose.connect(uri);
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.error('MongoDB connection FAIL');
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
