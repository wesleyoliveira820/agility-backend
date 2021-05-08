const { test } = use('Test/Suite')('Send Email Forgot Password');
const Mail = use('Mail');
const EmailForgotPasswordJob = use('App/Jobs/SendEmailForgotPassword');

test('should send a fake email without errors', async ({ assert }) => {
  Mail.fake();

  const userPayload = {
    name: 'Jhon',
    email: 'jhondoe@gmail.com',
    verification_code: 12345678,
  };

  const emailForgotPasswordJob = new EmailForgotPasswordJob();

  await emailForgotPasswordJob.handle({ data: userPayload });

  const recentEmail = Mail.pullRecent();

  assert.equal(recentEmail.message.to[0].address, userPayload.email);

  Mail.restore();
});
