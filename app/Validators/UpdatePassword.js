class UpdatePassword {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      verification_code: 'required',
      password: 'required|min:8|confirmed',
    };
  }

  get messages() {
    return {
      'verification_code.required': 'O código de verificação é obrigatório.',
      'password.required': '"Senha" é um campo obrigatório.',
      'password.min': '"Senha" deve conter ao menos 8 caracteres.',
      'password.confirmed': 'As senhas não são iguais.',
    };
  }
}

module.exports = UpdatePassword;
