const mongoose = require('mongoose');

const connectDB = async (req, res) => {
    try {
        const connString = process.env.DATABASE_URI
                                                    .replace('<db_username>',process.env.DATABASE_USER)
                                                    .replace('<db_password>',process.env.DATABASE_PASSWORD);

        await mongoose.connect(connString);
        console.log('Database connected successfully');
    } catch (error) {
        console.log(error);
        process.emit('SIGTERM');
    }
}

module.exports = connectDB;