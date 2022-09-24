import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

const sessionCookie = () => {
    // Build a JWT payload. { id, email }
    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email: 'test@test.com',
        role: 'admin'
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

it('fetches the order', async () => {
    // create a product
    const product = Product.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: 'product 1',
        price: 20,
        size: ['S', 'M', 'L', 'XL'],
        details: 'details',
        reviews: ['look great'],
        type: 'asd',
        color: ['red', 'blue'],
        userId: new mongoose.Types.ObjectId().toHexString(),
        productUrl: 'url',
    })
    await product.save();

    const user = sessionCookie();

    // make a request to build an order with this product
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ productId: product.id })
        .expect(201);

    // make request to fetch the order
    const { body: fetchOrder } = await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(200);
    
    expect(fetchOrder.id).toEqual(order.id);
});

it('returns an error if one user tries to fetch another user order', async () => {
    // create a product
    const product = Product.build({
        id: new mongoose.Types.ObjectId().toHexString(),
        name: 'product 1',
        price: 20,
        size: ['S', 'M', 'L', 'XL'],
        details: 'details',
        reviews: ['look great'],
        type: 'asd',
        color: ['red', 'blue'],
        userId: new mongoose.Types.ObjectId().toHexString(),
        productUrl: 'url',
    })
    await product.save();

    const user = sessionCookie();

    // make a request to build an order with this product
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ productId: product.id })
        .expect(201);

    // make request to fetch the order
    await request(app)
        .get(`/api/orders/${order.id}`)
        .set('Cookie', sessionCookie())
        .send()
        .expect(401);
})