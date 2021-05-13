/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');

class ProjectController {
  async store({ request, response, auth }) {
    const data = request.only(['title', 'description']);

    const projectTitleAlreadyExists = await auth.user
      .myProjects()
      .where('title', data.title)
      .first();

    if (projectTitleAlreadyExists) {
      return response.status(409).send([{
        field: 'title',
        message: 'Já existe um projeto com este título',
      }]);
    }

    const projectPayload = {
      user_id: auth.user.id,
      ...data,
    };

    const {
      id,
      title,
      description,
    } = await auth.user.projects().create(projectPayload);

    const roleAdmin = await Role.findBy({ slug: 'admin' });

    const projectJoin = await auth.user.projectJoins()
      .where('project_id', id)
      .first();

    await projectJoin.roleUserProjects().create({ role_id: roleAdmin.id });

    return response.status(201).send({ id, title, description });
  }
}

module.exports = ProjectController;
