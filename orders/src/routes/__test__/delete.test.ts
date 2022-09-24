import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';
import { Order, OrderStatus } from '../../models/order';

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

it('marks an order as cancelled', async () => {
    // create a product with Product model
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

    // make a request to create an order
    const { body: order } = await request(app)
        .post('/api/orders')
        .set('Cookie', user)
        .send({ productId: product.id })
        .expect(201);
        
    // make a request to cancel the order
    await request(app)
        .delete(`/api/orders/${order.id}`)
        .set('Cookie', user)
        .send()
        .expect(204);

    // expectation to make sure the thing is cancelled
    const updateOrder = await Order.findById(order.id);

    expect(updateOrder!.status).toEqual(OrderStatus.Cancelled);
})

it.todo('emit a order cancelled event')