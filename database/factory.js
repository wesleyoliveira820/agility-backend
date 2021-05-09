/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory');
const { v4: uuidV4 } = require('uuid');

Factory.blueprint('App/Models/User', (faker, i, data) => ({
  id: uuidV4(),
  name: faker.name(),
  email: faker.email(),
  password: faker.string({ length: 8 }),
  verified_account: false,
  verification_code: faker.integer({ min: 11111111, max: 99999999 }),
  ...data,
}));

Factory.blueprint('App/Models/ForgotPassword', (faker, i, data) => ({
  id: uuidV4(),
  user_id: data.user_id,
  verification_code: faker.integer({ min: 11111111, max: 99999999 }),
  ...data,
}));
