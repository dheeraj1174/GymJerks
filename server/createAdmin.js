const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

const createAdmin = async () => {
    try {
        const userExists = await User.findOne({ email: 'admin@gymjerks.com' });

        if (userExists) {
            console.log('Admin user already exists');
            process.exit();
        }

        const user = await User.create({
            name: 'Admin User',
            email: 'admin@gymjerks.com',
            password: 'password123',
        });

        console.log('Admin User Created:', user.email);
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

createAdmin();
