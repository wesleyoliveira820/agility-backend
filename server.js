const { Ignitor } = require('@adonisjs/ignitor');
const fold = require('@adonisjs/fold');

new Ignitor(fold)
  .appRoot(__dirname)
  .fireHttpServer()
  .catch(console.error);
