class UpdatePassword {
  get rules() {
    return {
      verification_code: 'required',
      password: 'required|min:8|confirmed',
    };
  }
}

module.exports = UpdatePassword;
