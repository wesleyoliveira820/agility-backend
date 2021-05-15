class StoreForgotPassword {
  get rules() {
    return {
      email: 'required|email',
    };
  }

  get messages() {
    return {
      'email.required': '"Email" é um campo obrigatório.',
      'email.email': 'Este email é inválido.',
    };
  }
}

module.exports = StoreForgotPassword;
