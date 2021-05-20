class SendInvite {
  get rules() {
    return {
      emails: 'required|array',
      project_id: 'required',
    };
  }

  get messages() {
    return {
      'emails.required': 'É necessário convidar ao menos 1 email.',
      'emails.array': 'O formato de envio dos emails é inválido.',
      'project_id.required': 'O id do projeto é obrigatório para enviar convites.',
    };
  }
}

module.exports = SendInvite;
