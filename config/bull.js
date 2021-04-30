const Env = use('Env');

module.exports = {
  connection: Env.get('BULL_CONNECTION', 'bull'),

  bull: {
    redis: {
      host: Env.get('REDIS_HOST', 'localhost'),
      port: Env.get('REDIS_PORT', 6379),
      password: Env.get('REDIS_PASSWORD', null),
      db: 0,
      keyPrefix: '',
    },
  },

  remote: '',
};
