import mongoose from 'mongoose';

import { app } from './app';
// import { natsWrapper } from './nats-wrapper';
// import { ProductUpdatedListener } from './events/listeners/product-updated-listener';
// import { ProductCreatedListener } from './events/listeners/product-created-listener';
// import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
// import { PaymentCreatedListener } from './events/listeners/payment-created-listener';

const start = async () => {
    console.log('Starting order service...');
    if (!process.env.JWT_KEY) {
        throw new Error('JWT_KEY must be defined');
    }
    
    if (!process.env.MONGO_ORDER_SERVICE) {
        throw new Error('MONGO_URI must be defined');
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

        // new ProductCreatedListener(natsWrapper.client).listen();
        // new ProductUpdatedListener(natsWrapper.client).listen();
        // new ExpirationCompleteListener(natsWrapper.client).listen();
        // new PaymentCreatedListener(natsWrapper.client).listen();

        await mongoose.connect(process.env.MONGO_ORDER_SERVICE)
        console.log('Connected to mongodb');
    } catch (err) {
        console.error(err);
    }   
};

// starting server on port 3000
app.listen(8002, () => {
    console.log('Order service server listening on port 8002!')
});

start();