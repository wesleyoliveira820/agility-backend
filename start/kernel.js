/** @type {import('@adonisjs/framework/src/Server')} */
const Server = use('Server');

const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'App/Middleware/ConvertEmptyStringsToNull',
];

const namedMiddleware = {
  is: 'App/Middleware/Is',
  auth: 'Adonis/Middleware/Auth',
  guest: 'Adonis/Middleware/AllowGuestOnly',
};

const serverMiddleware = [
  // 'Adonis/Middleware/Static',
  'Adonis/Middleware/Cors',
];

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware)
  .use(serverMiddleware);
