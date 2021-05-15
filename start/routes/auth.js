/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
  Route.post('login', 'LoginController.store');

  Route.post('forgot-password', 'ForgotPasswordController.store')
    .validator('StoreForgotPassword');

  Route.put('reset-password', 'ResetPasswordController.update').validator('UpdatePassword');

  Route.put('refresh-token', 'LoginController.update');
}).middleware('guest').prefix('auth');
