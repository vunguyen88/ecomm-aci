import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Product } from '../../models/product';

const sessionCookie = () => {
    // Build a JWT payload. { id, email }
    const payload = {
        id: '1fsdlkj324sdf',
        email: 'test@test.com'
    };

    // Create the JWT
    const token = jwt.sign(payload, process.env.JWT_KEY!);

    // Build session Object. { jwt: MY_JWT }
    const session = { jwt: token };

    // Turn that session into JSON
    const sessionJSON = JSON.stringify(session);

    // Take JSON and encode it as base64
    const base64 = Buffer.from(sessionJSON).toString('base64');

    // Return a string thats the cookie with the enconded data
    return [`express:sess=${base64}`];
}

it('fetches orders for an particular user', async () => {
    // create 3 products
    const product1 = Product.build({
        id: mongoose.Types.ObjectId().toHexString(),
        name: 'product 1',
        price: 20,
        size: ['S', 'M', 'L', 'XL'],
        details: 'details',
        reviews: ['look great'],
        type: 'asd',
        color: ['red', 'blue'],
        userId: mongoose.Types.ObjectId().toHexString(),
        productUrl: 'url',
    })
    await product1.save();

    const product2 = Product.build({
        id: mongoose.Types.ObjectId().toHexString(),
        name: 'product 1',
        price: 20,
        size: ['S', 'M', 'L', 'XL'],
        details: 'details',
        reviews: ['look great'],
        type: 'asd',
        color: ['red', 'blue'],
        userId: mongoose.Types.ObjectId().toHexString(),
        productUrl: 'url',
    })
    await product2.save();

    const product3 = Product.build({
        id: mongoose.Types.ObjectId().toHexString(),
        name: 'product 1',
        price: 20,
        size: ['S', 'M', 'L', 'XL'],
        details: 'details',
        reviews: ['look great'],
        type: 'asd',
        color: ['red', 'blue'],
        userId: mongoose.Types.ObjectId().toHexString(),
        productUrl: 'url',
    })
    await product3.save();

    const user1 = sessionCookie();
    const user2 = sessionCookie();

    // create one order as user#1
    await request(app)
        .post('/api/orders')
        .set('Cookie', user1)
        .send({ productId: product1.id })
        .expect(201);

    // create two orders as user#2
    await request(app)
        .post('/api/orders')
        .set('Cookie', user2)
        .send({ productId: product2.id })
        .expect(201);
    await request(app)
        .post('/api/orders')
        .set('Cookie', user2)
        .send({ productId: product3.id })
        .expect(201);

    // make request to get orders for user#2
    const response = await request(app)
        .get('/api/orders')
        .set('Cookie', user2)
        .expect(200);

    // make sure we only got the orders for user#2
    //console.log(response.body);
})