/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.resource('projects', 'ProjectController')
  .apiOnly()
  .middleware(['auth'])
  .validator(new Map([
    [['projects.store'], ['StoreProject']],
  ]));

Route.post('invites', 'InviteController.store')
  .middleware(['auth'])
  .validator('SendInvite')
  .middleware(['is:admin']);

Route.post('accept-invites', 'InviteController.accept').middleware(['auth']);
