/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class InvitesSchema extends Schema {
  up() {
    this.create('invites', (table) => {
      table.uuid('id').primary().notNullable().unique();
      table.string('email').notNullable().index();
      table.uuid('owner_id').references('id').inTable('users');
      table.uuid('project_id')
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('invites');
  }
}

module.exports = InvitesSchema;
