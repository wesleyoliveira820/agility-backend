/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ForgotPassword = use('App/Models/ForgotPassword');

const createCode = use('App/Helpers/CodeGenerator');
const { v4: uuidV4 } = require('uuid');

class ForgotPasswordController {
  async store({ request, response }) {
    const { email } = request.all();

    const user = await User.findBy('email', email);

    if (!user) {
      return response.status(404).send({
        message: 'This email does not exist.',
      });
    }

    if (!user.verified_account) {
      return response.status(401).send({
        message: 'This account has not yet been verified.',
      });
    }

    const verification_code = createCode();

    await ForgotPassword.create({
      id: uuidV4(),
      user_id: user.id,
      verification_code,
    });

    return response.status(200).send({
      message: 'Order sent, check your email.',
    });
  }
}

module.exports = ForgotPasswordController;
