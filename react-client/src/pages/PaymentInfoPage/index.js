import React from 'react';
import { Link } from 'react-router-dom';

const PaymentInfoPage = () => {
  return (
    <>
     <div className="info">
      <div className="container">
        <div className="info__wrapper">
          <h2 className="info__title">PRIVACY POLICY</h2>
          <div className="info__content">
            <p className="info__prelist">To purchase the Premium analytics there are 3 easy steps:</p>
            <ul className="info__list">
              <li>Select the product (service), specify your email and click “Proceed to Checkout”</li>
              <li>Select the payment method: Bank Card</li>
              <li>Once you’re redirected to a billing sheet, fill in your payment details and complete the checkout. As soon as the payment is approved, you will get a confirmation and will be redirected back to <Link className="info__link" to="/">bruno.cash</Link> website. If a purchase is made after 6 pm (GMT), you will get predictions the next day by 10 am (GMT) to the email specified during a payment process.</li>
            </ul>
            <h3>PAYMENT USING BANK CARD</h3>
            <p>Bank card is the easiest and most secure payment method accepted around the world. To purchase the analytics you need a VISA or MasterCard bank card having enough of balance needed to complete the payment. We accept only EUR currency.</p>
            <p>According to the PCI Security Standards any customer’s card information is protected by the Transport Layer Security – TLS 1.2 and the AES 256 bit key encryption algorithm.</p>
          </div>
        </div>
      </div>
     </div>
    </>
  )
}

export default PaymentInfoPage;