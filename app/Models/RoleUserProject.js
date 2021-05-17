/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class RoleUserProject extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'SetUuidHook.createUuid');
  }

  project() {
    return this.belongsTo('App/Models/Project');
  }

  role() {
    return this.belongsTo('App/Models/Role');
  }
}

module.exports = RoleUserProject;
