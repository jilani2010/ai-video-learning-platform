import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/db';
import { analyzeVideoTranscript } from '@/lib/ai-analysis';

export async function POST(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { videoId, transcript } = body;

    const video = await prisma.video.findUnique({
      where: { id: videoId },
    });

    if (!video) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Analyze transcript with AI
    const analysis = await analyzeVideoTranscript(transcript);

    // Store analysis in database
    const videoAnalysis = await prisma.videoAnalysis.create({
      data: {
        videoId,
        summary: analysis.summary || '',
        topics: analysis.topics || [],
        learningGoals: analysis.learningGoals || [],
        keyTakeaways: analysis.keyTakeaways || [],
        chapters: {
          create: (analysis.chapters || []).map((chapter: any, index: number) => ({
            title: chapter.title,
            description: chapter.description,
            startTime: chapter.startTime || 0,
            endTime: chapter.endTime || 0,
            order: index,
          })),
        },
      },
      include: {
        chapters: true,
      },
    });

    // Update video status
    await prisma.video.update({
      where: { id: videoId },
      data: { status: 'analyzed', transcript },
    });

    return NextResponse.json(videoAnalysis, { status: 201 });
  } catch (error) {
    console.error('Error analyzing video:', error);
    return NextResponse.json({ error: 'Failed to analyze video' }, { status: 500 });
  }
}
