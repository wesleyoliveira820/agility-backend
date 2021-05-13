/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Role = use('App/Models/Role');
const { v4: uuidV4 } = require('uuid');

class RoleSeeder {
  async run() {
    await Role.create({
      id: uuidV4(),
      title: 'Admin',
      slug: 'admin',
    });

    await Role.create({
      id: uuidV4(),
      title: 'Member',
      slug: 'member',
    });
  }
}

module.exports = RoleSeeder;
