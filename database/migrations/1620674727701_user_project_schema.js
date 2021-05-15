/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoleUserProjectSchema extends Schema {
  up() {
    this.create('user_projects', (table) => {
      table.uuid('id').primary().notNullable().unique();
      table.uuid('user_id')
        .index()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.uuid('project_id')
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('user_projects');
  }
}

module.exports = RoleUserProjectSchema;
