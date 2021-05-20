/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Project = use('App/Models/Project');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

const Bull = use('Rocketseat/Bull');
const Job = use('App/Jobs/SendInvite');
const Env = use('Env');

const InviteHook = exports = module.exports = {};

InviteHook.send = async (modelInstance) => {
  if (Env.get('NODE_ENV') === 'testing') return;

  const {
    id,
    project_id,
    owner_id,
    email,
  } = modelInstance;

  const project = await Project.findBy('id', project_id);

  const senderUser = await User.findBy('id', owner_id);

  const payloadData = {
    invite_id: id,
    sender_email: senderUser.email,
    guest_email: email,
    project_title: project.title,
    app_url: Env.get('CLIENT_URL'),
  };

  Bull.add(Job.key, payloadData);
};
