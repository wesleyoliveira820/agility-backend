/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class List extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'SetUuidHook.createUuid');
  }
}

module.exports = List;
