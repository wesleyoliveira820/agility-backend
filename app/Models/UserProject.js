/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class UserProject extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'SetUuidHook.createUuid');
  }

  roleUserProjects() {
    return this.hasMany('App/Models/RoleUserProject');
  }
}

module.exports = UserProject;
