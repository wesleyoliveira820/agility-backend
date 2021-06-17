/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ListSchema extends Schema {
  up() {
    this.create('lists', (table) => {
      table.uuid('id').primary().notNullable().unique();
      table.string('title').notNullable();
      table.boolean('create_cards').defaultTo(false);
      table
        .uuid('project_id')
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('lists');
  }
}

module.exports = ListSchema;
