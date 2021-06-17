class StoreCard {
  get rules() {
    return {
      title: 'string|required',
      project_id: 'string|required',
    };
  }

  get messages() {
    return {
      'title.required': '"Título" é um campo obrigatório.',
      'project_id.required': 'O id do projeto deve ser fornecido.',
    };
  }
}

module.exports = StoreCard;
