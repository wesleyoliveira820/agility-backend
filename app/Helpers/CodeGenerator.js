const { promisify } = require('util');
const crypto = require('crypto');

async function createCode() {
  const randomBytes = promisify(crypto.randomBytes);

  const code = await randomBytes(16);

  return code.toString('hex');
}

module.exports = createCode;
