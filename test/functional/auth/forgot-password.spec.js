const { test, trait } = use('Test/Suite')('Forgot Password');
const Factory = use('Factory');
const Database = use('Database');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('should create an account recovery code', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    email: 'jhondoe@gmail.com',
    verification_code: null,
    verified_account: true,
  });

  const response = await client.post('auth/forgot-password').send({
    email: user.email,
  }).end();

  response.assertStatus(200);

  const code = await Database.from('forgot_passwords').where('user_id', user.id).first();

  assert.isNotNull(code);

  assert.exists(code.verification_code);
});

test('should return error when trying to request a password reset with an unregistered email', async ({ client }) => {
  const response = await client.post('auth/forgot-password').send({
    email: 'jhondoe@gmail.com',
  }).end();

  response.assertStatus(404);
});

test('should return error when trying to request a password reset without having the account verified', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create({
    email: 'jhondoe@gmail.com',
  });

  const response = await client.post('auth/forgot-password').send({
    email: user.email,
  }).end();

  response.assertStatus(401);
});
