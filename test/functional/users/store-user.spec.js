const { test, trait } = use('Test/Suite')('Store User');
const Database = use('Database');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('DatabaseTransactions');

test('should create a new user successfully and return the status 201', async ({ assert, client }) => {
  const userPayload = {
    name: 'Jhon Doe',
    email: 'jhondoe@gmail.com',
    password: 'MyPassword8',
    password_confirmation: 'MyPassword8',
  };

  const response = await client.post('users').send(userPayload).end();

  const user = await Database
    .table('users')
    .select('*')
    .where('email', userPayload.email)
    .first();

  response.assertStatus(201);

  assert.exists(user.id);

  assert.isNotNull(user.verification_code);

  assert.equal(user.email, userPayload.email);
});

test('should fail when trying to register a user with an existing email', async ({ assert, client }) => {
  const userPayload = {
    name: 'Jhon Doe',
    email: 'jhondoe@gmail.com',
    password: 'MyPassword8',
    password_confirmation: 'MyPassword8',
  };

  await Factory.model('App/Models/User').create({
    email: userPayload.email,
  });

  const response = await client.post('users').send(userPayload).end();

  response.assertStatus(400);

  assert.equal(response.body[0].validation, 'unique');

  assert.equal(response.body[0].field, 'email');
});
