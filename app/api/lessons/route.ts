import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');

    const lessons = await prisma.lesson.findMany({
      where: {
        status: status || 'published',
        category: category || undefined,
      },
      include: {
        creator: { select: { id: true, name: true, avatar: true } },
        _count: { select: { comments: true, likes: true } },
      },
      orderBy: { publishedAt: 'desc' },
      take: 20,
    });

    return NextResponse.json(lessons);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch lessons' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, content, videoId, category, tags, status } = body;

    const user = await prisma.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const lesson = await prisma.lesson.create({
      data: {
        title,
        description,
        content,
        videoId,
        category,
        tags: tags || [],
        status: status || 'draft',
        createdById: user.id,
        publishedAt: status === 'published' ? new Date() : null,
      },
      include: {
        creator: true,
      },
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (error) {
    console.error('Error creating lesson:', error);
    return NextResponse.json({ error: 'Failed to create lesson' }, { status: 500 });
  }
}
