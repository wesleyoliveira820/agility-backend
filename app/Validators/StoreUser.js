const { rule } = use('Validator');

class StoreUser {
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
}

module.exports = StoreUser;
