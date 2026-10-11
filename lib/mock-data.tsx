import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const title = typeof body?.title === 'string' ? body.title : 'Untitled video';

  const payload = {
    title,
    status: 'success',
    summary:
      'AI extracted the strongest learning moments, chapter structure, and takeaways from the upload. It is now ready for community publishing.',
    transcriptSnippet:
      'This lesson highlights how creators build better systems, improve retention, and turn audience loyalty into sustainable learning products.',
    chapters: [
      'Opening hook and problem definition',
      'Systems for learning and publishing',
      'Audience engagement patterns',
      'Monetization and community growth'
    ],
    learningGoals: [
      'Recognize the most valuable learning moments in a video',
      'Convert video content into a structured lesson',
      'Build a repeatable publishing workflow for learning content'
    ]
  };

  return NextResponse.json(payload);
}
