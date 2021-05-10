/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema');

class ModifyColumnVerificationCodeForgotPasswordSchema extends Schema {
  up() {
    this.alter('forgot_passwords', (table) => {
      table.string('verification_code').alter();
    });
  }

  down() {
    this.alter('forgot_passwords', (table) => {
      table.integer('verification_code').alter();
    });
  }
}

module.exports = ModifyColumnVerificationCodeForgotPasswordSchema;
