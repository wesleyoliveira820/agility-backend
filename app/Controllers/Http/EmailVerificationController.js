/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class EmailVerificationController {
  async update({ request, response }) {
    const { code } = request.all();

    const user = await User.findByOrFail('verification_code', code);

    user.verified_account = true;

    user.verification_code = null;

    await user.save();

    return response.status(200).send({
      message: 'Conta verificada com sucesso! Você já pode fazer login!',
    });
  }
}

module.exports = EmailVerificationController;
