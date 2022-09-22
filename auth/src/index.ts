import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
    console.log('Starting auth service...'); 
    
    // check if all env is defined when app start running
    // if (!process.env.JWT_KEY) {
    //     throw new Error('JWT_KEY must be defined');
    // }
    
    // if (!process.env.SMS_SERVICE_URL) {
    //     throw new Error('SMS_SERVICE_URL must be defined');
    // }

    // if (!process.env.APP_ID) {
    //     throw new Error('APP_ID must be defined');
    // }

    // if (!process.env.APP_NAME) {
    //     throw new Error('APP_NAME must be defined');
    // }

    if (!process.env.MONGO_URI) {
        throw new Error('MONGO_URI must be defined');
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to mongodb');
    } catch (err) {
        console.log('Error when connect to mongoose')
        console.error(err);
    } 
};

// starting server on port 3000
app.listen(3000, () => {
    console.log('Auth service server listening on port 3000!!')
});

start();