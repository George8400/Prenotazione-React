import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import React from 'react';

const initialOptions = {
  'client-id': 'test',
  currency: 'EUR',
  intent: 'capture',
  'data-client-token': 'abc123xyz==',
};

const PaymentButton = () => {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <PayPalButtons />
    </PayPalScriptProvider>
  );
};

export default PaymentButton;
