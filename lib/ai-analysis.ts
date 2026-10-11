import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeVideoTranscript(transcript: string) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages: [
      {
        role: 'system',
        content: `You are an expert educational content analyst. Analyze the provided video transcript and extract:
1. A concise summary (2-3 sentences)
2. Key topics (5-7 topics)
3. Suggested chapters with timings
4. Learning goals (3-5 goals)
5. Key takeaways (5-7 takeaways)

Respond in JSON format.`
      },
      {
        role: 'user',
        content: `Please analyze this transcript:\n\n${transcript}`
      }
    ],
    temperature: 0.7,
  });

  const content = completion.choices[0].message.content;
  return JSON.parse(content || '{}');
}

export async function generateTranscript(audioUrl: string) {
  // In production, use Whisper API or similar
  // This is a placeholder
  return 'Sample transcript from audio processing';
}
