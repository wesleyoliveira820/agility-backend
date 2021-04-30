/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash');
const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/ConfirmEmailAccount');
const Env = use('Env');

const UserHook = exports = module.exports = {};

UserHook.hashPassword = async (modelInstance) => {
  if (modelInstance.dirty.password) {
    modelInstance.password = await Hash.make(modelInstance.password);
  }
};

UserHook.sendEmailConfirmationAccount = async (modelInstance) => {
  if (Env.get('NODE_ENV') === 'testing') return;

  const { verification_code, name, email } = modelInstance;

  const firstname = name.split(' ')[0];

  const payloadData = {
    name: firstname,
    email,
    verification_code,
  };

  Bull.add(Job.key, payloadData);
};
