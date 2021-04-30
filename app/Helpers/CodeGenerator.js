function createCode() {
  const code = Math.floor(Math.random() * (999999 - 100000)) + 10000000;
  return code;
}

module.exports = createCode;
