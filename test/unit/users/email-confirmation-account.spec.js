const { test } = use('Test/Suite')('Email Confirmation Account');
const Mail = use('Mail');
const ConfirmEmailJob = use('App/Jobs/ConfirmEmailAccount');

test('should send a fake email without errors', async ({ assert }) => {
  Mail.fake();

  const userPayload = {
    name: 'Jhon Doe',
    email: 'jhondoe@gmail.com',
    verification_code: 12345678,
  };

  const confirmEmailJob = new ConfirmEmailJob();

  await confirmEmailJob.handle({ data: userPayload });

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, userPayload.email);

  Mail.restore();
});
