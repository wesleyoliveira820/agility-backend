class StoreListProject {
  get rules() {
    return {
      title: 'string|required',
      project_id: 'string|required',
    };
  }

  get messages() {
    return {
      'title.required': 'É necessário fornecer um nome para a lista.',
      'project_id.required': 'É necessário fornecer o id do projeto.',
    };
  }
}

module.exports = StoreListProject;
