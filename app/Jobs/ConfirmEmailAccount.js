const Mail = use('Mail');

class ConfirmEmailAccount {
  static get key() {
    return '@ConfirmEmailAccount';
  }

  async handle(job) {
    const { data } = job;

    await Mail.send('emails/confirm-email', data, (message) => {
      message
        .to(data.email)
        .from('donotreply@agility.com')
        .subject('Confirmação de email | Agility');
    });

    return data;
  }
}

module.exports = ConfirmEmailAccount;
