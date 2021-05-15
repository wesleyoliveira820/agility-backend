/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ProjectsSchema extends Schema {
  up() {
    this.create('projects', (table) => {
      table.uuid('id').primary().notNullable().unique();
      table.string('title').index().notNullable();
      table.uuid('user_id')
        .index()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.text('description');
      table.timestamps();
    });
  }

  down() {
    this.drop('projects');
  }
}

module.exports = ProjectsSchema;
