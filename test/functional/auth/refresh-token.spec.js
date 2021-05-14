const { test, trait } = use('Test/Suite')('Refresh Token');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should return a new JWT token with refresh token', async ({ assert, client }) => {
  const userPayload = {
    email: 'jhondoe@gmail.com',
    password: 'MyPassword 2',
  };

  await Factory.model('App/Models/User').create({
    ...userPayload,
    verified_account: true,
    verification_code: null,
  });

  const auth = await client.post('auth/login')
    .send(userPayload)
    .end();

  const { refresh_token } = auth.body;

  const response = await client.put('auth/refresh-token')
    .send({ refresh_token })
    .end();

  response.assertStatus(200);

  assert.exists(response.body.token);

  assert.exists(response.body.refresh_token);

  assert.notEqual(response.body.refresh_token, auth.body.refresh_token);
});

test('should fail when trying to renew the token with the user still authenticated', async ({ client }) => {
  const userPayload = {
    email: 'jhondoe@gmail.com',
    password: 'MyPassword 2',
  };

  const user = await Factory.model('App/Models/User').create({
    ...userPayload,
    verified_account: true,
    verification_code: null,
  });

  const auth = await client.post('auth/login')
    .send(userPayload)
    .end();

  const { refresh_token } = auth.body;

  const response = await client.put('auth/refresh-token')
    .loginVia(user)
    .send({ refresh_token })
    .end();

  response.assertStatus(403);
});
