"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payeer = void 0;
const ts_money_1 = require("ts-money");
const querystring_1 = require("querystring");
const crypto_1 = require("./crypto");
class Payeer {
    constructor(config) {
        this.config = config;
    }
    generatePaymentPageUrl(orderId, price) {
        const { shopId, secretKey, callbackUrls } = this.config;
        const description = crypto_1.base64encode(`Order ID: ${orderId}`);
        const amount = price.toDecimal().toFixed(2);
        const hash = [shopId, orderId, amount, price.currency, description];
        const key = crypto_1.md5(secretKey + orderId);
        const urls = JSON.stringify(callbackUrls);
        const params = encodeURIComponent(crypto_1.rijndael256ecb(urls, key));
        hash.push(params, secretKey);
        const sign = crypto_1.sha256(hash.join(':')).toUpperCase();
        const queryParams = {
            m_shop: shopId,
            m_orderid: orderId,
            m_amount: amount,
            m_curr: price.currency,
            m_desc: description,
            m_sign: sign,
            m_params: params,
            m_process: 'send'
        };
        return `https://payeer.com/merchant/?${querystring_1.stringify(queryParams)}`;
    }
    parsePaymentCallback(body) {
        const callbackHash = [
            body['m_operation_id'],
            body['m_operation_ps'],
            body['m_operation_date'],
            body['m_operation_pay_date'],
            body['m_shop'],
            body['m_orderid'],
            body['m_amount'],
            body['m_curr'],
            body['m_desc'],
            body['m_status'],
            this.config.secretKey
        ];
        const validSign = crypto_1.sha256(callbackHash.join(':')).toUpperCase();
        const isSignValid = body['m_sign'] === validSign;
        const isPaymentSuccess = isSignValid && body['m_status'] === 'success';
        const amountPaid = isPaymentSuccess
            ? ts_money_1.Money.fromDecimal(body['m_amount'], body['m_curr'])
            : new ts_money_1.Money(0, 'USD');
        return {
            isPaymentSuccess,
            orderId: body['m_orderid'],
            amountPaid
        };
    }
}
exports.Payeer = Payeer;
//# sourceMappingURL=payeer.js.map