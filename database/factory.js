/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { v4: uuidV4 } = require('uuid');

Factory.blueprint('App/Models/User', (faker, i, data) => ({
  id: uuidV4(),
  name: faker.name(),
  email: faker.email(),
  password: faker.string({ length: 8 }),
  verified_account: false,
  verification_code: faker.hash({ length: 16 }),
  ...data,
}));

Factory.blueprint('App/Models/ForgotPassword', (faker, i, data) => ({
  id: uuidV4(),
  user_id: data.user_id,
  verification_code: faker.hash({ length: 16 }),
  ...data,
}));

Factory.blueprint('App/Models/Project', (faker, i, data) => ({
  title: faker.string(),
  description: faker.sentence({ words: 5 }),
  ...data,
}));

Factory.blueprint('App/Models/Invite', (fake, i, data) => ({
  project_id: data.project_id,
  email: data.email,
  owner_id: data.owner_id,
}));
