/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { v4: uuidV4 } = require('uuid');

Factory.blueprint('App/Models/User', (faker, i, data) => ({
  id: uuidV4(),
  name: faker.name(),
  email: faker.email(),
  password: faker.string({ length: 8 }),
  ...data,
}));
