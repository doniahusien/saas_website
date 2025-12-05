export default defineEventHandler(async event => {
  const runtimeConfig = useRuntimeConfig();
  const body = await readBody(event);

  try {
    const origin = event.req.headers.origin || `http://${event.req.headers.host}`;

    const successUrl = new URL(`${origin}/reservation/${body}`);

    const session = await stripe.checkout.sessions.create({
      success_url: `${successUrl}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${runtimeConfig.public.baseURL}/error`,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Example Product',
              description: 'Description of the example product',
            },
            unit_amount: 1000,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
    });

    return { url: session.url };
  } catch (error) {
    setResponseStatus(event, 500);
    return { error: 'Something went wrong' };
  }
});
