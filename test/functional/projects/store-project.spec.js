const { test, trait } = use('Test/Suite')('Projects');
const Factory = use('Factory');
const Database = use('Database');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should create a new project and link user with admin', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verification_code: null,
    verified_account: true,
  });

  const response = await client.post('projects')
    .loginVia(user)
    .send({
      title: 'Agility',
      description: 'A simple task platform',
    })
    .end();

  response.assertStatus(201);

  assert.hasAllKeys(response.body, ['id', 'title', 'description']);

  const project = await Database
    .from('projects')
    .where('id', response.body.id);

  const userProject = await Database
    .from('user_projects')
    .where('project_id', response.body.id)
    .first();

  const roleUserProject = await Database
    .from('role_user_projects')
    .where('user_project_id', userProject.id);

  assert.isNotEmpty(project);

  assert.isNotEmpty(roleUserProject);
});

test('should fail with status 401 when trying create new project without authentication', async ({ client }) => {
  const response = await client.post('projects')
    .send({
      title: 'Agility',
      description: 'A simple task platform',
    })
    .end();

  response.assertStatus(401);
});

test('should fail with status 409 when trying create new project with title already exists', async ({ client }) => {
  const projectPayload = {
    title: 'Agility',
  };

  const user = await Factory.model('App/Models/User').create({
    verification_code: null,
    verified_account: true,
  });

  await Factory.model('App/Models/Project').create({
    user_id: user.id,
    ...projectPayload,
  });

  const response = await client.post('projects')
    .loginVia(user)
    .send(projectPayload)
    .end();

  response.assertStatus(409);
});
