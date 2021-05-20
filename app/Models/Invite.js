/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Invite extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'SetUuidHook.createUuid');

    this.addHook('afterCreate', 'InviteHook.send');
  }

  project() {
    return this.belongsTo('App/Models/Project');
  }
}

module.exports = Invite;
