/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model');
const randomColor = require('randomcolor');

class User extends Model {
  static boot() {
    super.boot();

    this.addHook('beforeSave', 'UserHook.hashPassword');

    this.addHook('afterCreate', 'UserHook.sendEmailConfirmationAccount');
  }

  static get computed() {
    return ['initial_name', 'color_name'];
  }

  getInitialName({ name }) {
    return name[0];
  }

  getColorName() {
    return randomColor({
      format: 'hex',
      luminosity: 'bright',
    });
  }

  projectJoins() {
    return this.hasMany('App/Models/UserProject');
  }

  projects() {
    return this.belongsToMany('App/Models/Project').pivotModel('App/Models/UserProject');
  }

  myProjects() {
    return this.hasMany('App/Models/Project');
  }
}

module.exports = User;
