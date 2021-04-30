/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');
const createCode = use('App/Helpers/CodeGenerator');

const { v4: uuidV4 } = require('uuid');

class UserController {
  async store({ request, response }) {
    const data = request.only(['name', 'email', 'password']);

    const verification_code = createCode();

    await User.create({
      id: uuidV4(),
      verification_code,
      ...data,
    });

    return response.status(201).send();
  }
}

module.exports = UserController;
