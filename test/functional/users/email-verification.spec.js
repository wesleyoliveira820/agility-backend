const { test, trait } = use('Test/Suite')('Email Verification');
const Factory = use('Factory');
const Database = use('Database');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test("should verify the user's account successfully", async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    email: 'jhondoe@gmail.com',
  });

  const { verification_code } = user;

  const response = await client.put('confirm-accounts').send({
    code: verification_code,
  }).end();

  response.assertStatus(200);

  const createdUser = await Database
    .select('id', 'email', 'verification_code', 'verified_account')
    .from('users')
    .where('email', 'jhondoe@gmail.com')
    .first();

  assert.isTrue(createdUser.verified_account);

  assert.isNull(createdUser.verification_code);
});

test('should fail to try to verify an account whose code does not exist', async ({ client }) => {
  await Factory.model('App/Models/User').create({
    verification_code: null,
  });

  const response = await client.put('confirm-accounts').send({
    code: '12345678',
  }).end();

  response.assertStatus(404);
});
