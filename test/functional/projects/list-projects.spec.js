const createProjectMock = require('../../mocks/create-user-project.mock');

const { test, trait } = use('Test/Suite')('List Projects');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should return a list of all projects that the user participates in', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verified_account: true,
    verification_code: null,
  });

  await createProjectMock(user);

  const response = await client.get('projects').loginVia(user).end();

  response.assertStatus(200);

  assert.isArray(response.body);
});
