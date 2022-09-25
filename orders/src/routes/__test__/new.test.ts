import mongoose from 'mongoose';
import request from 'supertest';
import jwt from 'jsonwebtoken';
import { app } from '../../app';
import { Order, OrderStatus } from '../../models/order';
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

it('return an error if the product does not exist', async () => {
    const productId = mongoose.Types.ObjectId();

    await request(app)
        .post('/api/orders')
        .set('Cookie', sessionCookie())
        .send({ productId })
        .expect(404)

});

it('return an error if the product is already reserved', async () => {
    const product = Product.build({
        id: '610519ab15b080001979bcf5',
        name: 'product 1',
        price: 20,
        size: ['S', 'M', 'L', 'XL'],
        details: 'details',
        reviews: ['look great'],
        type: 'asd',
        color: ['red', 'blue'],
        userId: 'sadfasdf',
        productUrl: 'url',
    })
    await product.save();
    const order = Order.build({
        product,
        userId: '610519ab15b0fg401979bcf5',
        status: OrderStatus.Created,
        expiresAt: new Date()
    });
    await order.save()

    await request(app)
        .post('/api/orders')
        .set('Cookie', sessionCookie())
        .send({ productId: product.id })
        .expect(400);
});

// it('reserve a product', async () => {
//     const product = Product.build({
//         id: '610519ab15b065301979bcf5',
//         name: 'product 1',
//         price: 20,
//         size: ['S', 'M', 'L', 'XL'],
//         details: 'details',
//         reviews: ['look great'],
//         type: 'asd',
//         color: ['red', 'blue'],
//         userId: 'sadfasdf',
//         productUrl: 'url',
//     })
//     await product.save();

//     await request(app)
//         .post('/api/orders')
//         .set('Cookie', sessionCookie())
//         .send({ productId: product.id })
//         .expect(201);
// });

it.todo('create order event')