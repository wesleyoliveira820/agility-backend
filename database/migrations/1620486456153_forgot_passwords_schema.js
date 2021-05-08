/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ForgotPasswordsSchema extends Schema {
  up() {
    this.create('forgot_passwords', (table) => {
      table.uuid('id').notNullable().unique();
      table.uuid('user_id')
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .notNullable();
      table.integer('verification_code').notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop('forgot_passwords');
  }
}

module.exports = ForgotPasswordsSchema;
