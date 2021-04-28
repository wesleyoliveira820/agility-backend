/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
  driver: Env.get('HASH_DRIVER', 'bcrypt'),

  bcrypt: {
    rounds: 10,
  },

  argon: {
    type: 1,
  },
};
