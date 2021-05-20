/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Invite = use('App/Models/Invite');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');

class InviteController {
  async store({ request, response, auth }) {
    const { emails, project_id } = request.all();

    if (emails.includes(auth.user.email)) {
      return response.status(403).send({
        message: 'Você não pode convidar você mesmo.',
      });
    }

    const formattedInvites = emails.map((email) => ({
      email,
      project_id,
      owner_id: auth.user.id,
    }));

    await Invite.createMany(formattedInvites);

    return response.status(201).send({
      message: 'Convite(s) enviado(s)!',
    });
  }

  async accept({ request, response, auth }) {
    const inviteId = request.input('invite_id');

    if (!inviteId) {
      return response.status(400).send({
        message: 'Este convite é inválido.',
      });
    }

    const invite = await Invite.query()
      .where('id', inviteId)
      .where('email', auth.user.email)
      .with('project')
      .first();

    if (!invite) {
      return response.status(404).send({
        message: 'Este convite não existe ou é inválido.',
      });
    }

    const roleMember = await Role.findBy('slug', 'member');

    await auth.user.IParticipateProjects()
      .create({
        project_id: invite.project_id,
        role_id: roleMember.id,
      });

    await invite.delete();

    const inviteJson = invite.toJSON();

    return response.status(200).send({
      message: `Agora você faz parte do projeto ${inviteJson.project.title}!`,
    });
  }
}

module.exports = InviteController;
