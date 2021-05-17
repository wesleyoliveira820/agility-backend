const { test, trait } = use('Test/Suite')('List Projects');
const Factory = use('Factory');
const Role = use('App/Models/Role');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should return a list of all projects that the user participates in', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verified_account: true,
    verification_code: null,
  });

  const project = await user.myProjects().create({
    title: 'Test',
  });

  const roleAdmin = await Role.findBy('slug', 'admin');

  await project.roleUserProjects().create({
    user_id: user.id,
    role_id: roleAdmin.id,
  });

  const response = await client.get('projects').loginVia(user).end();

  response.assertStatus(200);

  assert.isArray(response.body);
});
