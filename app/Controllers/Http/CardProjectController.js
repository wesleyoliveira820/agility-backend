/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Card = use('App/Models/Card');

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const List = use('App/Models/List');

class CardProjectController {
  async store({ request, response }) {
    const { title, description, project_id } = request.all();

    const list = await List.query()
      .where('project_id', project_id)
      .where('create_cards', true)
      .first();

    const card = await Card.create({
      title,
      description,
      list_id: list.id,
    });

    return response.status(201).json(card);
  }
}

module.exports = CardProjectController;
