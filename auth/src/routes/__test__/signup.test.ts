import request from 'supertest';
import { app } from '../../app';

it('returns a 201 on successful signup', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password',
            role: "admin"
        })
        .expect(201);
})

it('return 400 with invalid email', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test',
            password: '123456',
            role: 'admin'
        })
        .expect(400);
})

it('return 400 with invalid password', async () => {
    return request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@gmail.com',
            password: '123',
            role: 'admin'
        })
        .expect(400);
})

it('return 400 with missing email and password', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({ 
            email: 'test@gmail.com',
            role: 'admin'
        })
        .expect(400);

    await request(app)
        .post('/api/users/signup')
        .send({ 
            password: '123456',
        })
        .expect(400);
})

it('disallow duplicate emails', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456',
            role: 'admin'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456',
            role: 'admin'
        })
        expect(400)
})

it('set a cookie after successful signup', async () => {
    const response = await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456',
            role: 'admin'
        })
        .expect(201)
    
    expect(response.get('Set-Cookie')).toBeDefined();
})