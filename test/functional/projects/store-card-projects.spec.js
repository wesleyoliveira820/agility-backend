const { test, trait } = use('Test/Suite')('Store Card Project');
const Factory = use('Factory');
const createProjectMock = require('../../mocks/create-user-project.mock');

trait('Test/ApiClient');
trait('Auth/Client');
trait('DatabaseTransactions');

test('should successfully create a card in the project', async ({ client }) => {
  const user = await Factory.model('App/Models/User').create({
    verification_code: null,
    verified_account: true,
  });

  const project = await createProjectMock(user);

  await Factory.model('App/Models/List').create({
    project_id: project.id,
    create_cards: true,
  });

  const response = await client.post('/projects/lists/cards')
    .loginVia(user)
    .send({
      title: 'Card 1',
      project_id: project.id,
    })
    .end();

  response.assertStatus(201);
});
