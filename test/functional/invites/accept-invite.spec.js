const { test, trait } = use('Test/Suite')('Accept Invite');
const Factory = use('Factory');
const Database = use('Database');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should add a user to the project as a regular member', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').createMany(2, {
    verified_account: true,
    verification_code: null,
  });

  const [sender_user, guest_user] = user;

  const project = await Factory.model('App/Models/Project').create({
    user_id: sender_user.id,
  });

  const invite = await Factory.model('App/Models/Invite').create({
    project_id: project.id,
    email: guest_user.email,
    owner_id: sender_user.id,
  });

  const response = await client.post('accept-invites')
    .loginVia(guest_user)
    .send({
      invite_id: invite.id,
    })
    .end();

  response.assertStatus(200);

  const userProject = await Database.from('role_user_projects')
    .where('user_id', guest_user.id)
    .where('project_id', project.id)
    .first();

  assert.isNotNull(userProject);
});

test('should fail when trying to accept an invitation that does not exist', async ({ assert, client }) => {
  const user = await Factory.model('App/Models/User').create({
    verified_account: true,
    verification_code: null,
  });

  const response = await client.post('accept-invites')
    .loginVia(user)
    .send({
      invite_id: '874353c0-ebc9-4b0b-87cf-c3c2374a48eb',
    })
    .end();

  response.assertStatus(404);

  assert.exists(response.body.message);
});
