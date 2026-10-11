import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

export const PLANS = {
  free: {
    name: 'Free',
    price: 0,
    limits: {
      videosPerMonth: 5,
      storageGB: 5,
      analysisCalls: 50,
    },
  },
  pro: {
    name: 'Pro',
    price: 29,
    limits: {
      videosPerMonth: 100,
      storageGB: 500,
      analysisCalls: 5000,
    },
  },
  enterprise: {
    name: 'Enterprise',
    price: 199,
    limits: {
      videosPerMonth: 1000,
      storageGB: 5000,
      analysisCalls: 50000,
    },
  },
};
