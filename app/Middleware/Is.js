class Is {
  async handle({
    request,
    response,
    auth,
  }, next, properties) {
    const projectId = request.input('project_id');
    const roles = properties;

    const project = await auth.user.IParticipateProjects()
      .where('project_id', projectId)
      .with('role')
      .first();

    if (!project) {
      return response.status(404).send({
        message: 'Este projeto não existe.',
      });
    }

    const projectJson = project.toJSON();

    if (!roles.includes(projectJson.role.slug)) {
      return response.status(403).send({
        message: 'Você não tem autorização para acessar este recurso.',
      });
    }

    return next();
  }
}

module.exports = Is;
