/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoleUserProjectSchema extends Schema {
  up() {
    this.create('role_user_projects', (table) => {
      table.uuid('id').primary().notNullable().unique();
      table.uuid('user_project_id')
        .index()
        .references('id')
        .inTable('user_projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.uuid('role_id')
        .references('id')
        .inTable('roles');
      table.timestamps();
    });
  }

  down() {
    this.drop('role_user_projects');
  }
}

module.exports = RoleUserProjectSchema;
