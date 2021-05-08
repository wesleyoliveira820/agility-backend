/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class ForgotPassword extends Model {
  static boot() {
    super.boot();

    this.addHook('afterCreate', 'ForgotPasswordHook.sendEmail');
  }

  user() {
    return this.belongsTo('App/Models/User');
  }
}

module.exports = ForgotPassword;
