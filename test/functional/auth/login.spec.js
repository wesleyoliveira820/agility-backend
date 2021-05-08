const { test, trait } = use('Test/Suite')('Login');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('should return user information with a JWT code', async ({ assert, client }) => {
  const userPayload = {
    email: 'jhondoe@gmail.com',
    password: 'MyPassword2',
  };

  await Factory.model('App/Models/User').create({
    ...userPayload,
    verification_code: null,
    verified_account: true,
  });

  const response = await client.post('auth/login').send(userPayload).end();

  response.assertStatus(200);

  assert.exists(response.body.token);

  assert.exists(response.body.user);
});

test('should fail when trying to login with the wrong password', async ({ client }) => {
  const userPayload = {
    email: 'jhondoe@gmail.com',
    password: 'MyPassword2',
  };

  await Factory.model('App/Models/User').create({
    ...userPayload,
    verification_code: null,
    verified_account: true,
  });

  userPayload.password = '12345678';

  const response = await client.post('auth/login').send(userPayload).end();

  response.assertStatus(401);
});

test('should fail when trying to log in with an email that does not exist', async ({ client }) => {
  const userPayload = {
    email: 'jhondoe@gmail.com',
    password: 'MyPassword2',
  };

  await Factory.model('App/Models/User').create({
    ...userPayload,
    verification_code: null,
    verified_account: true,
  });

  userPayload.email = 'example@gmail.com';

  const response = await client.post('auth/login').send(userPayload).end();

  response.assertStatus(401);
});

test('should fail when trying to sign in without having verified account', async ({ client }) => {
  const userPayload = {
    email: 'jhondoe@gmail.com',
    password: 'MyPassword2',
  };

  await Factory.model('App/Models/User').create(userPayload);

  const response = await client.post('auth/login').send(userPayload).end();

  response.assertStatus(403);
});
