const { Ignitor } = require('@adonisjs/ignitor');
const fold = require('@adonisjs/fold');

new Ignitor(fold)
  .appRoot(__dirname)
  .preLoad('preloads/bull')
  .wsServer()
  .fireHttpServer()
  .catch(console.error);
