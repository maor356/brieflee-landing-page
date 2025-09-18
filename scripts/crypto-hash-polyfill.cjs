const crypto = require('node:crypto');

if (typeof crypto.hash !== 'function') {
  crypto.hash = (algorithm, data, outputEncoding) => {
    const hash = crypto.createHash(algorithm);
    hash.update(data);
    const digest = hash.digest();
    if (outputEncoding) {
      return typeof digest === 'string' ? digest : digest.toString(outputEncoding);
    }
    return digest;
  };
}

module.exports = {};
