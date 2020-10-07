
const { Money } = require('ts-money/build/index.js');
const { Payeer } = require('payeer-node/dist/payeer.js');

module.exports = strapi => {
  return {
    async initialize() {
      const { shopId, secretKey } = strapi.config.get('hook.settings.payeer');

      strapi.services.payeer = new Payeer({
        shopId: `${shopId}`,
        secretKey: `${secretKey}`,
        callbackUrls: {
          success_url: 'https://bruno.cash/payment-success',
          fail_url: 'https://bruno.cash/payment-fail',
          status_url: 'https://bruno.cash/payment-status'
        }
      });
    },
  };
};