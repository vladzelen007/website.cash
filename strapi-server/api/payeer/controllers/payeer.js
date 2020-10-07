const axios = require('axios');
const { Money } = require('ts-money/build/index.js');
const { Payeer } = require('../../../libs/payeer-node/dist/payeer.js');
  
  module.exports = {
    /**
     * Get Payment URL
     * @return {String}
     */ 

    payeer: new Payeer({
      shopId: process.env.PAYEER_M_SHOP_ID,
      secretKey: process.env.PAYEER_SECRET_KEY,
      callbackUrls: {
        success_url: 'https://url/payment-success',
        fail_url: 'https://url/payment-fail',
        status_url: 'https://url/payment-status'
      }
    }),

   async getPaymentUrls(ctx) {

    const result = [
      await this.payeer.generatePaymentPageUrl(
        ctx.params.payToken,
        Money.fromDecimal(1, 'RUB')
      ),
      await this.payeer.generatePaymentPageUrl(
        ctx.params.payToken,
        Money.fromDecimal(29.99, 'RUB')
      ),
      await this.payeer.generatePaymentPageUrl(
        ctx.params.payToken,
        Money.fromDecimal(49.99, 'RUB')
      )
    ]
     return ctx.send(result)
   },

   async parsePaymentCallback(ctx) {
    let result = await this.payeer.parsePaymentCallback(ctx.query)
    return ctx.send(result)
   }
};