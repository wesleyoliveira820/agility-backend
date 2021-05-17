/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');

const formatMessage = use('App/Helpers/ResponseValidatorFormatter');

class ProjectController {
  async index({ response, auth }) {
    const projects = await auth.user
      .IParticipateProjects()
      .orderByRaw('created_at DESC')
      .with('project', (build) => {
        build.select('id', 'title', 'description');
      })
      .fetch();

    const formattedResponse = projects
      .toJSON()
      .map(({ project }) => project);

    return response.status(200).send(formattedResponse);
  }

  async store({ request, response, auth }) {
    const data = request.only(['title', 'description']);

    const projectTitleAlreadyExists = await auth.user
      .myProjects()
      .where('title', data.title)
      .first();

    if (projectTitleAlreadyExists) {
      return response.status(409).send(formatMessage(
        'title',
        'Já existe um projeto com este título.',
      ));
    }

    const project = await auth.user.myProjects().create(data);

    const roleAdmin = await Role.findBy({ slug: 'admin' });

    await project.roleUserProjects().create({
      user_id: auth.user.id,
      role_id: roleAdmin.id,
    });

    const { id, title, description } = project;

    return response.status(201).send({ id, title, description });
  }

  async show({ params, response, auth }) {
    const projectId = params.id;

    const project = await auth.user.IParticipateProjects()
      .where('project_id', projectId)
      .with('project', (build) => {
        build.select('id', 'title');
      })
      .with('role', (build) => {
        build.select('id', 'slug');
      })
      .first();

    if (!project) {
      return response.status(404).send({
        message: 'Este projeto não existe.',
      });
    }

    const { project: projectInfo, role } = project.toJSON();

    return response.status(200).send({
      ...projectInfo,
      my_role: role,
    });
  }
}

module.exports = ProjectController;
