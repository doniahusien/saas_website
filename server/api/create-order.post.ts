import { stripe } from './../utils/stripe';

export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig();
  const body = await readBody(event);

  try {
    const origin = event.req.headers.origin || `http://${event.req.headers.host}`;

    const successUrl = new URL(`${origin}/checkout`);
    successUrl.searchParams.append('order_type', body.order_type);
    successUrl.searchParams.append('is_schedule', body.is_schedule);
    successUrl.searchParams.append('paymentMethods', 'credit');
    
    if (body.pay_type) {
      successUrl.searchParams.append('pay_type', JSON.stringify(body.pay_type));
    }
    
    if (body.order_date) {
      successUrl.searchParams.append('order_date', body.order_date);
    }
    
    if (body.order_time) {
      successUrl.searchParams.append('order_time', body.order_time);
    }
    
    if (body.address_id) {
      successUrl.searchParams.append('address_id', body.address_id);
    }
    
    if (body.store_id) {
      successUrl.searchParams.append('store_id', body.store_id);
    }

    let amount = 0;
    let currency = 'usd'; 
    
    if (body.pay_type && Array.isArray(body.pay_type)) {
      const creditPayment = body.pay_type.find(item => item.credit !== undefined);
      if (creditPayment && creditPayment.credit) {
        amount = Math.round(creditPayment.credit * 100); 
      }
    }

    if (!amount || amount <= 0) {
      setResponseStatus(event, 400);
      return { error: 'Invalid payment amount' };
    }

    const session = await stripe.checkout.sessions.create({
      success_url: `${successUrl.toString()}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Order Payment',
              description: 'Payment for your order',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    });

    return { url: session.url };
  } catch (error: any) {
    console.error('Stripe checkout error:', error);
    setResponseStatus(event, 500);
    return { error: error.message || 'Something went wrong' };
  }
});
