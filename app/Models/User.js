/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', 'UserHook.hashPassword');

    this.addHook('afterCreate', 'UserHook.sendEmailConfirmationAccount');
  }

  tokens() {
    return this.hasMany('App/Models/Token');
  }
}

module.exports = User;
