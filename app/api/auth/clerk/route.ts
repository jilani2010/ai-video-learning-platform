import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { prisma } from '@/lib/db';

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const svix_id = headers().get('svix-id') || '';
  const svix_timestamp = headers().get('svix-timestamp') || '';
  const svix_signature = headers().get('svix-signature') || '';

  const body = await req.json();
  const wh = new Webhook(webhookSecret);
  let evt: any;

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as any;
  } catch (err) {
    return new Response('Webhook Error', { status: 400 });
  }

  const { type } = evt.data;
  const eventData = evt.data;

  if (type === 'user.created') {
    const { id, email_addresses, first_name, last_name, image_url } = eventData;
    const email = email_addresses[0]?.email_address;

    await prisma.user.create({
      data: {
        clerkId: id,
        email: email || '',
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        avatar: image_url || undefined,
      },
    });
  }

  if (type === 'user.updated') {
    const { id, email_addresses, first_name, last_name, image_url } = eventData;
    const email = email_addresses[0]?.email_address;

    await prisma.user.update({
      where: { clerkId: id },
      data: {
        email: email || undefined,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        avatar: image_url || undefined,
      },
    });
  }

  if (type === 'user.deleted') {
    await prisma.user.delete({
      where: { clerkId: eventData.id },
    });
  }

  return new Response('', { status: 200 });
}
