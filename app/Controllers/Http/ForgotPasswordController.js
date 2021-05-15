/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ForgotPassword = use('App/Models/ForgotPassword');

const createCode = use('App/Helpers/CodeGenerator');
const formatMessage = use('App/Helpers/ResponseValidatorFormatter');

const { v4: uuidV4 } = require('uuid');

class ForgotPasswordController {
  async store({ request, response }) {
    const { email } = request.all();

    const user = await User.findBy('email', email);

    if (!user) {
      return response.status(404).send(formatMessage(
        'email',
        'Não há conta cadastrada com este email.',
      ));
    }

    if (!user.verified_account) {
      return response.status(401).send(formatMessage(
        'email',
        'Este conta ainda não foi verificada.',
      ));
    }

    const verification_code = await createCode();

    await ForgotPassword.create({
      id: uuidV4(),
      user_id: user.id,
      verification_code,
    });

    return response.status(200).send({
      message:
        `O link de recuperação foi enviado para seu
        email. Você pode fechar esta aba.`,
    });
  }
}

module.exports = ForgotPasswordController;
