const mongoose = require('mongoose');
const supertest = require('supertest');
const { server: app, listen } = require('../index');
const User = require('../server/api/v1/models/user.model');

const server = supertest(app);

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
  listen.close();
});

const validUser = {
  name: 'user1',
  surname: 'test1',
  email: 'user1@gmail.com',
  dni: '73048140',
  phone: '981540121',
  level: 'client', // super_admin, admin, client
};

const postUser = (user = validUser) => {
  const agent = server.post('/api/v1/user');
  return agent.send(user);
};

describe('User Registration', () => {
  it('returns 200 ok when signup request is valid', async () => {
    const response = await postUser();
    expect(response.status).toBe(200);
  });
  it('saves the user to database', async () => {
    await postUser();
    const userList = await User.find({});
    expect(userList.length).toBe(1);
  });
  it('saves the name and email to database', async () => {
    await postUser();
    const userList = await User.find({});
    const savedUser = userList[0];
    expect(savedUser.name).toBe('user1');
    expect(savedUser.email).toBe('user1@gmail.com');
  });
  it('returns 409 when name is null', async () => {
    const response = await postUser({
      name: null,
      surname: 'test1',
      email: null,
      dni: '73048140',
      phone: '981540121',
      level: 'client',
    });
    expect(response.status).toBe(400);
  });
  it('returns errors field in response body when validation error occurs', async () => {
    const response = await postUser({
      name: null,
      surname: 'test1',
      email: 'user1@gmail.com',
      dni: '73048140',
      phone: '981540121',
      level: 'client',
    });
    expect(response.error).toBeUndefined();
  });
});
