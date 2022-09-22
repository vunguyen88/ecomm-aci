import request from 'supertest';
import { app } from '../../app';

it('fails when signin with user with supplied email', async () => {
    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '123456',
        })
        .expect(400)
});

it('fails when signin with wrong credential', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456',
            role: 'admin'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '1234567',
        })
        .expect(400)
})

it('response with cookie when signin success', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456',
            role: 'admin'
        })
        .expect(201)

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '123456',
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
})