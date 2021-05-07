/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.post('users', 'UserController.store').validator('StoreUser');

Route.put('confirm-accounts', 'EmailVerificationController.update');
