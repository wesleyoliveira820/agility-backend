const BaseExceptionHandler = use('BaseExceptionHandler');
const Env = use('Env');
const Youch = use('youch');

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages);
    }

    const environment = Env.get('NODE_ENV');

    if (environment === 'development' || environment === 'testing') {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();

      return response.status(error.status).send(errorJSON);
    }

    if (error.status !== 500) {
      return response.status(error.status).send(error.messages);
    }

    return response.status(500).send({
      message: 'Desculpe, um erro inesperado no servidor ocorreu.',
    });
  }
}

module.exports = ExceptionHandler;
