import { Money } from 'ts-money';
import { Config, OrderId, PaymentCallback } from './types';
export declare class Payeer {
    private config;
    constructor(config: Config);
    generatePaymentPageUrl(orderId: OrderId, price: Money): string;
    parsePaymentCallback(body: {
        [key in string]: string | number;
    }): PaymentCallback;
}
