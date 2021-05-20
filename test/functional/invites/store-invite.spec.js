const { test, trait } = use('Test/Suite')('Member Invite');
const Factory = use('Factory');
const Role = use('App/Models/Role');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should create one in the successful project invitation', async ({ assert, client }) => {
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

  const response = await client.post('invites')
    .loginVia(user)
    .send({
      emails: ['jhondoe@gmail.com'],
      project_id: project.id,
    }).end();

  response.assertStatus(201);

  assert.exists(response.body.message);
});

test('should fail when trying to create a project invitation without being an admin', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verified_account: true,
    verification_code: null,
  });

  const project = await user.myProjects().create({
    title: 'Test',
  });

  const roleMember = await Role.findBy('slug', 'member');

  await project.roleUserProjects().create({
    user_id: user.id,
    role_id: roleMember.id,
  });

  const response = await client.post('invites')
    .loginVia(user)
    .send({
      emails: ['jhondoe@gmail.com'],
      project_id: project.id,
    }).end();

  response.assertStatus(403);

  assert.exists(response.body.message);
});

test('should fail when trying to create an invitation for yourself', async ({ assert, client }) => {
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

  const response = await client.post('invites')
    .loginVia(user)
    .send({
      emails: [user.email],
      project_id: project.id,
    }).end();

  response.assertStatus(403);

  assert.exists(response.body.message);
});

test('should fail when trying to create an invitation to a project that does not exist', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verified_account: true,
    verification_code: null,
  });

  const response = await client.post('invites')
    .loginVia(user)
    .send({
      emails: ['jhondoe@gmail.com'],
      project_id: '874353c0-ebc9-4b0b-87cf-c3c2374a48eb',
    }).end();

  response.assertStatus(404);

  assert.exists(response.body.message);
});
