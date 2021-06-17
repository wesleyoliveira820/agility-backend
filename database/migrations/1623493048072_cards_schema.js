/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class CardsSchema extends Schema {
  up() {
    this.create('cards', (table) => {
      table.uuid('id').primary().notNullable().unique();
      table.string('title').notNullable();
      table.text('description');
      table
        .uuid('list_id')
        .references('id')
        .inTable('lists')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.timestamps();
    });
  }

  down() {
    this.drop('cards');
  }
}

module.exports = CardsSchema;
