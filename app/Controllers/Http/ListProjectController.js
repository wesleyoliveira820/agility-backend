/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const List = use('App/Models/List');

const formatMessage = use('App/Helpers/ResponseValidatorFormatter');
const Ws = use('Ws');

class ListProjectController {
  async store({ request, response }) {
    const { title, project_id } = request.only(['title', 'project_id']);

    const existsListTitleInProject = await List.findBy({
      title,
      project_id,
    });

    if (existsListTitleInProject) {
      return response.status(409).send(formatMessage(
        'title',
        `Já existe uma lista chamada "${title}" neste projeto.`,
      ));
    }

    const list = await List.create({ title, project_id });

    const channelPath = `projectRoom:${project_id}`;

    const channel = Ws.getChannel('projectRoom:*');

    const topic = channel.topic(channelPath);

    if (topic) {
      topic.broadcastToAll('new:list', list);
    }

    return response.status(201).send();
  }
}

module.exports = ListProjectController;
