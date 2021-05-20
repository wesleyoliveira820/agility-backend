const Mail = use('Mail');

class SendInvite {
  static get key() {
    return '@sendInvite';
  }

  async handle(job) {
    const { data } = job;

    await Mail.send('emails/send-invite', data, (message) => {
      message
        .to(data.guest_email)
        .from('donotreply@agility.com')
        .subject('Convite | Agility');
    });

    return data;
  }
}

module.exports = SendInvite;
