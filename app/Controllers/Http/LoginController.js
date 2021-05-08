/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User');

class LoginController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    const user = await User
      .query()
      .select('id', 'name', 'email', 'verified_account')
      .where('email', email)
      .first();

    if (user && !user.verified_account) {
      return response.status(403).send({
        message: 'Esta conta ainda não foi verificada.',
      });
    }

    const { token } = await auth.attempt(email, password);

    user.verified_account = undefined;

    return response.status(200).send({ user, token });
  }
}

module.exports = LoginController;
