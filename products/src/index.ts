import mongoose from 'mongoose';

import { app } from './app';
//import { natsWrapper } from './nats-wrapper';
//import { OrderCreatedListener } from './events/listeners/order-created-listener';
//import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const start = async () => {
    console.log('Starting products service...');
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    
    if (!process.env.MONGO_PRODUCT_SERVICE) {
        throw new Error('MONGO_PRODUCT_SERVICE must be defined');
    }

    // if (!process.env.NATS_CLIENT_ID) {
    //     throw new Error('NATS_CLIENT_ID must be defined');
    // }

    // if (!process.env.NATS_URL) {
    //     throw new Error('NATS_URL must be defined');
    // }

    // if (!process.env.NATS_CLUSTER_ID) {
    //     throw new Error('NATS_CLUSTER_ID must be defined');
    // }

    try {
        // new architect not require pub/sub
        // await natsWrapper.connect(
        //     process.env.NATS_CLUSTER_ID,
        //     process.env.NATS_CLIENT_ID,
        //     process.env.NATS_URL
        // );
        // natsWrapper.client.on('close', () => {
        //     console.log('NATS connection closed!');
        //     process.exit(); 
        // });
        // process.on('SIGINT', () => natsWrapper.client.close());
        // process.on('SIGTERM', () => natsWrapper.client.close());

        // new OrderCreatedListener(natsWrapper.client).listen();
        // new OrderCancelledListener(natsWrapper.client).listen();

        await mongoose.connect(process.env.MONGO_PRODUCT_SERVICE)
        console.log('Connected to mongodb');
    } catch (err) {
        console.error(err);
    }   
};

// starting server on port 3000
app.listen(8001, () => {
    console.log('Product service server listening on port 8001!!')
});

start();