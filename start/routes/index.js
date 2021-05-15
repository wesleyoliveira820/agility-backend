/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

require('./user');
require('./auth');
require('./project');

Route.get('/', async ({ response }) => response.send({ message: 'Bem-vindo(a) a API da Agility!' }));
