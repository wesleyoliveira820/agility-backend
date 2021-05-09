class UpdatePassword {
  get rules() {
    return {
      verification_code: 'required|min:8|max:8',
      password: 'required|min:8|confirmed',
    };
  }
}

module.exports = UpdatePassword;
