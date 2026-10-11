import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/db';

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { lessonId } = body;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already liked
    const existing = await prisma.like.findUnique({
      where: {
        lessonId_userId: {
          lessonId,
          userId: user.id,
        },
      },
    });

    if (existing) {
      // Unlike
      await prisma.like.delete({
        where: { id: existing.id },
      });
      return NextResponse.json({ liked: false });
    }

    // Like
    await prisma.like.create({
      data: {
        lessonId,
        userId: user.id,
      },
    });

    return NextResponse.json({ liked: true });
  } catch (error) {
    console.error('Error toggling like:', error);
    return NextResponse.json({ error: 'Failed to toggle like' }, { status: 500 });
  }
}
