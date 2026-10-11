import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const videos = await prisma.video.findMany({
      include: {
        analysis: true,
        createdBy: { select: { id: true, name: true, avatar: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 20,
    });

    return NextResponse.json(videos);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, videoUrl, thumbnailUrl, duration } = body;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const video = await prisma.video.create({
      data: {
        title,
        description,
        videoUrl,
        thumbnailUrl,
        duration,
        createdById: user.id,
      },
      include: {
        createdBy: true,
      },
    });

    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    console.error('Error creating video:', error);
    return NextResponse.json({ error: 'Failed to create video' }, { status: 500 });
  }
}
