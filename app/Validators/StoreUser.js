const { rule } = use('Validator');

class StoreUser {
  get validateAll() {
    return true;
  }

  get rules() {
    return {
      name: [
        rule('required'),
        rule('string'),
        rule('min', 3),
        rule('regex', /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/),
      ],
      email: 'required|email|unique:users',
      password: 'required|min:8|confirmed',
    };
  }

  get messages() {
    return {
      'name.required': '"Nome" é um campo obrigatório.',
      'name.min': '"Nome" deve conter ao menos 3 letras.',
      'name.regex': '"Nome" deve conter apenas letras.',
      'email.required': '"Email" é um campo obrigatório.',
      'email.email': 'Este email é inválido.',
      'email.unique': 'Este email já está sendo usado em outra conta.',
      'password.required': '"Senha" é um campo obrigatório.',
      'password.min': '"Senha" deve conter ao menos 8 caracteres.',
      'password.confirmed': 'As senhas não são iguais.',
    };
  }
}

module.exports = StoreUser;
