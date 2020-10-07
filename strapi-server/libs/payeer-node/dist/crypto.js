"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.md5 = exports.base64encode = exports.sha256 = exports.rijndael256ecb = void 0;
const mcrypt_1 = require("mcrypt");
const crypto_1 = require("crypto");
exports.rijndael256ecb = (data, secret) => {
    const cipher = new mcrypt_1.MCrypt('rijndael-256', 'ecb');
    cipher.validateKeySize(false);
    cipher.open(secret);
    return cipher.encrypt(data).toString('base64');
};
exports.sha256 = (data) => {
    return crypto_1.createHash('sha256')
        .update(data)
        .digest('hex');
};
exports.base64encode = (data) => {
    return Buffer.from(data).toString('base64');
};
exports.md5 = (data) => {
    return crypto_1.createHash('md5')
        .update(data)
        .digest('hex');
};
//# sourceMappingURL=crypto.js.map