const crypto = require('crypto');

const generateToken = () => {
  return crypto.randomBytes(20).toString('hex');
};
