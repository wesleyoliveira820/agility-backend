const createProjectMock = require('../../mocks/create-user-project.mock');

const { test, trait } = use('Test/Suite')('Show Project');
const Factory = use('Factory');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should return the user`s project information with access level', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verified_account: true,
    verification_code: null,
  });

  const project = await createProjectMock(user);

  const response = await client.get(`projects/${project.id}`).loginVia(user).end();

  response.assertStatus(200);

  assert.hasAllKeys(response.body, ['id', 'title', 'lists', 'my_role']);
});

test('should fail when trying to search for a project that the user does not belong to', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verified_account: true,
    verification_code: null,
  });

  const response = await client
    .get('projects/874353c0-ebc9-4b0b-87cf-c3c2374a48eb')
    .loginVia(user)
    .end();

  response.assertStatus(404);

  assert.exists(response.body.message);
});
