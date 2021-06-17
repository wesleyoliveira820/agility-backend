const Role = use('App/Models/Role');

async function createProjectMock(userInstance) {
  const project = await userInstance.myProjects().create({
    title: 'Project 1',
  });

  const roleAdmin = await Role.findBy('slug', 'admin');

  await project.roleUserProjects().create({
    user_id: userInstance.id,
    role_id: roleAdmin.id,
  });

  return project;
}

module.exports = createProjectMock;
