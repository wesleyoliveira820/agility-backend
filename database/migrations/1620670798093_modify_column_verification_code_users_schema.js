/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ModifyColumnVerificationCodeUsersSchema extends Schema {
  up() {
    this.alter('users', (table) => {
      table.string('verification_code').alter();
    });
  }

  down() {
    this.alter('users', (table) => {
      table.integer('verification_code').alter();
    });
  }
}

module.exports = ModifyColumnVerificationCodeUsersSchema;
