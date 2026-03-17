/*disable eslint*/
import axios from 'axios';
import { showAlert } from './alerts';

const stripe = Stripe(
  'pk_test_51T39QeRvxALW3oVEIT7h4PGNCmEUU9mflaTHUm1ScMreZgl57wDoSddzSAyZ6s6SrurS7CIVev0QTGZOClMBpif5001hLNP3nj',
);

export const bookTour = async (tourId) => {
  try {
    //1) Get checkout session from API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`,
    );
    console.log(session);

    //2) Create checkout session form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    console.log(err);
    showAlert('error', err);
  }
};
