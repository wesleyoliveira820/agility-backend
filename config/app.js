/** @type {import('@adonisjs/framework/src/Env')} */
const Env = use('Env');

module.exports = {
  name: Env.get('APP_NAME', 'AdonisJs'),
  appKey: Env.getOrFail('APP_KEY'),

  http: {
    allowMethodSpoofing: true,
    trustProxy: false,
    subdomainOffset: 2,
    jsonpCallback: 'callback',
    etag: false,
  },

  views: {
    cache: Env.get('CACHE_VIEWS', true),
  },

  static: {
    dotfiles: 'ignore',
    etag: true,
    extensions: false,
  },

  locales: {
    loader: 'file',
    locale: 'en',
  },

  logger: {
    transport: 'console',
    console: {
      driver: 'console',
      name: 'adonis-app',
      level: 'info',
    },
    file: {
      driver: 'file',
      name: 'adonis-app',
      filename: 'adonis.log',
      level: 'info',
    },
  },

  cookie: {
    httpOnly: true,
    sameSite: false,
    path: '/',
    maxAge: 7200,
  },
};
