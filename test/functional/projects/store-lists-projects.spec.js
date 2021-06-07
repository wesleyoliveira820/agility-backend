const { test, trait } = use('Test/Suite')('Store List Project');
const Factory = use('Factory');
const Role = use('App/Models/Role');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should create a new list in a project that the user participates', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create({
    verification_code: null,
    verified_account: true,
  });

  const project = await user.myProjects().create({
    title: 'Project 1',
  });

  const roleAdmin = await Role.findBy('slug', 'admin');

  await project.roleUserProjects().create({
    user_id: user.id,
    role_id: roleAdmin.id,
  });

  const response = await client.post('projects/lists')
    .loginVia(user)
    .send({
      title: 'List 1',
      project_id: project.id,
    })
    .end();

  response.assertStatus(201);
});

test('should return error when trying to create a list in a project that the user does not participate', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create({
    verification_code: null,
    verified_account: true,
  });

  const project = await user.myProjects().create({
    title: 'Project 1',
  });

  const response = await client.post('projects/lists')
    .loginVia(user)
    .send({
      title: 'List 1',
      project_id: project.id,
    })
    .end();

  response.assertStatus(404);
});
