const { test } = use('Test/Suite')('Email Confirmation Account');
const Mail = use('Mail');
const SendInviteJob = use('App/Jobs/SendInvite');

test('should successfully send a fake invitation', async ({ assert }) => {
  Mail.fake();

  const invitePayload = {
    invite_id: '758f9379-769b-40fa-8190-b8cb861c3257',
    project_title: 'Test application',
    sender_email: 'jhondoe@gmail.com',
    guest_email: 'margaret@gmail.com',
  };

  const sendInviteJob = new SendInviteJob();

  await sendInviteJob.handle({ data: invitePayload });

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, invitePayload.guest_email);

  Mail.restore();
});
