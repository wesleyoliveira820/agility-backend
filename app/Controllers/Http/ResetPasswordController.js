/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const ForgotPassword = use('App/Models/ForgotPassword');

const {
  subHours,
  differenceInMinutes,
} = require('date-fns');

class ResetPasswordController {
  async update({ request, response }) {
    const { verification_code, password } = request.all();

    const token = await ForgotPassword.findByOrFail({ verification_code });

    const newDate = subHours(new Date(), 3);

    const differenceBetweenMinutes = differenceInMinutes(newDate, token.created_at);

    // 15 minutes
    if (differenceBetweenMinutes > 15) {
      return response.status(401).send({
        message: 'O link de verificação está expirado.',
      });
    }

    const user = await token.user().fetch();

    user.password = password;

    await user.save();

    await token.delete();

    return response.status(200).send({
      message: 'Senha alterada com sucesso! Você já pode fazer login.',
    });
  }
}

module.exports = ResetPasswordController;
