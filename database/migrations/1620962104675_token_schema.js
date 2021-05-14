/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class TokenSchema extends Schema {
  up() {
    this.create('tokens', (table) => {
      table.uuid('id').primary().notNullable().unique();
      table.uuid('user_id')
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
      table.string('token').notNullable().unique().index();
      table.string('type').notNullable();
      table.boolean('is_revoked').defaultTo(false);
      table.timestamps();
    });
  }

  down() {
    this.drop('tokens');
  }
}

module.exports = TokenSchema;
