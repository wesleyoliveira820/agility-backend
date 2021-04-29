const BaseExceptionHandler = use('BaseExceptionHandler');
const Env = use('Env');
const Youch = use('youch');

class ExceptionHandler extends BaseExceptionHandler {
  async handle(error, { request, response }) {
    if (error.name === 'ValidationException') {
      return response.status(error.status).send(error.messages);
    }

    if (Env.get('NODE_ENV') === 'development') {
      const youch = new Youch(error, request.request);
      const errorJSON = await youch.toJSON();

      return response.status(error.status).send(errorJSON);
    }

    return response.status(500).send({
      message: 'Sorry, there was an internal server error.',
    });
  }
}

module.exports = ExceptionHandler;
