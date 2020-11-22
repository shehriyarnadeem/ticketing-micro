import request from 'supertest';
import { app } from '../../app';

it('Fails when a email does not exists test', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(400);
})

it('Fails when incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'pass' })
    .expect(400)


});

it('responds with a cookie when provided valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
});

it('On signout cookie is cleared', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({ email: 'test@test.com', password: 'password' })
    .expect(201);


  const response = await request(app)
    .get('/api/users/signout')
    .send({})
    .expect(200)
  // console.log(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly');
  expect(response.get('Set-Cookie')[0]).toEqual('express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly')
})