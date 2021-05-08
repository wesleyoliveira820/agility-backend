const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendEmailForgotPassword');
const Env = use('Env');

const ForgotPasswordHook = exports = module.exports = {};

ForgotPasswordHook.sendEmail = async (modelInstance) => {
  if (Env.get('NODE_ENV') === 'testing') return;

  const { verification_code } = modelInstance;

  const { name, email } = await modelInstance.user().first();

  const firstname = name.split(' ')[0];

  const payloadData = {
    name: firstname,
    email,
    verification_code,
    app_url: Env.get('CLIENT_URL'),
  };

  Bull.add(Job.key, payloadData);
};
