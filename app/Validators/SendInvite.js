class SendInvite {
  get rules() {
    return {
      emails: 'required|array|email',
      project_id: 'required',
    };
  }

  get messages() {
    return {
      'emails.required': 'É necessário convidar ao menos 1 email.',
      'emails.array': 'O formato de envio dos emails é inválido.',
      'emails.email': 'Algum email informado pode ser inválido.',
      'project_id.required': 'O id do projeto é obrigatório para enviar convites.',
    };
  }
}

module.exports = SendInvite;
