const { test, trait } = use('Test/Suite')('Reset Password');
const Factory = use('Factory');
const Database = use('Database');
const Hash = use('Hash');
const { subHours } = require('date-fns');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('should update the user password successfully', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verification_code: null,
    verified_account: true,
  });

  const { verification_code } = await Factory.model('App/Models/ForgotPassword')
    .create({ user_id: user.id });

  const payloadData = {
    verification_code,
    password: 'MyPassword2',
    password_confirmation: 'MyPassword2',
  };

  const response = await client.put('auth/reset-password').send(payloadData).end();

  response.assertStatus(200);

  await user.reload();

  const checkPassword = await Hash.verify(payloadData.password, user.password);

  const checkTokenInDatabse = await Database.from('forgot_passwords')
    .where({ verification_code });

  assert.isTrue(checkPassword);

  assert.isEmpty(checkTokenInDatabse);
});

test('should fail when trying to reset the password with an expired code', async ({ client }) => {
  const { id } = await Factory.model('App/Models/User').create({
    verification_code: null,
    verified_account: true,
  });

  const token = await Factory.model('App/Models/ForgotPassword').create({
    user_id: id,
  });

  const { verification_code } = token;

  await Database.from('forgot_passwords')
    .where({ verification_code })
    .update('created_at', subHours(new Date(), 5));

  const payloadData = {
    verification_code,
    password: 'MyPassword2',
    password_confirmation: 'MyPassword2',
  };

  const response = await client.put('auth/reset-password').send(payloadData).end();

  response.assertStatus(401);
});

test('should fail when trying to reset the password with a code that does not exist', async ({ client }) => {
  const payloadData = {
    verification_code: '12345678',
    password: 'MyPassword2',
    password_confirmation: 'MyPassword2',
  };

  const response = await client.put('auth/reset-password').send(payloadData).end();

  response.assertStatus(404);
});
