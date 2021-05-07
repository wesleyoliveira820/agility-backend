/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class EmailVerificationController {
  async update({ request, response }) {
    const { code } = request.all();

    if (!code) {
      return response.status(400).send({
        message: '"code" is required.',
      });
    }

    const user = await User.findBy('verification_code', code);

    if (!user) {
      return response.status(404).send({
        message: 'This code not exists.',
      });
    }

    user.verified_account = true;

    user.verification_code = null;

    await user.save();

    return response.status(200).send();
  }
}

module.exports = EmailVerificationController;
