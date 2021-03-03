const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log('Database successfully connected!');
    } catch(err){
        console.log('Database connection error!',err);
        process.exit(1);
    }
}

module.exports = connectDB;