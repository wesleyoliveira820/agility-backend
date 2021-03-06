/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');

class Token extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeCreate', 'SetUuidHook.createUuid');
  }
}

module.exports = Token;
