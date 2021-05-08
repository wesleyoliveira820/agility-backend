class StoreForgotPassword {
  get rules() {
    return {
      email: 'required|email',
    };
  }
}

module.exports = StoreForgotPassword;
