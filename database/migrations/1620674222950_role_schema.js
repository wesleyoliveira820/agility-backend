/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class RoleSchema extends Schema {
  up() {
    this.create('roles', (table) => {
      table.uuid('id').primary().notNullable().unique();
      table.string('title').notNullable().unique();
      table.string('slug').index().notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop('roles');
  }
}

module.exports = RoleSchema;
