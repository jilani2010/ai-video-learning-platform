import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/db';

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  const body = await request.text();
  const sig = request.headers.get('stripe-signature')!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return new NextResponse('webhook error', { status: 400 });
  }

  try {
    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object;
      
      const dbSubscription = await prisma.subscription.findUnique({
        where: { stripeId: subscription.id as string },
      });

      if (dbSubscription) {
        await prisma.subscription.update({
          where: { id: dbSubscription.id },
          data: {
            status: subscription.status,
            currentPeriodStart: new Date(subscription.current_period_start * 1000),
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      
      await prisma.subscription.update({
        where: { stripeId: subscription.id as string },
        data: { status: 'cancelled' },
      });
    }
  } catch (error) {
    console.error('Error processing webhook:', error);
  }

  return new NextResponse(null, { status: 200 });
}
