const Mail = use('Mail');

class SendEmailForgotPassword {
  static get key() {
    return '@sendEmailForgotPassword';
  }

  async handle(job) {
    const { data } = job;

    await Mail.send('emails/forgot-password', data, (message) => {
      message
        .to(data.email)
        .from('suport@agility.com')
        .subject('Pedido de redefinição de senha | Agility');
    });

    return data;
  }
}

module.exports = SendEmailForgotPassword;
