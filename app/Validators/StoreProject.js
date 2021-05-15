class StoreProject {
  get rules() {
    return {
      title: 'string|required',
    };
  }

  get messages() {
    return {
      'title.required': '"Título" é um campo obrigatório.',
    };
  }
}

module.exports = StoreProject;
