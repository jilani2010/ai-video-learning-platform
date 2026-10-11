"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, Loader2, UploadCloud } from 'lucide-react';

const sampleAnalysis = {
  summary: 'The video explains a simple content and feedback system that helps creators grow faster and improve retention with less churn.',
  topics: ['Audience research', 'Content loops', 'Feedback capture', 'Conversion strategy'],
  chapters: [
    'Hook and problem framing',
    'Building a repeatable content template',
    'Distribution and learning loops',
    'Turning insight into offers'
  ],
  learningGoals: [
    'Identify the core pain point in the audience journey',
    'Build a repeatable workflow for creating short-form educational content',
    'Turn one strong lesson into a publish-ready learning asset'
  ]
};

export default function UploadPage() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<typeof sampleAnalysis | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsAnalyzing(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setAnalysis(sampleAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-300">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
            <h1 className="text-3xl font-bold">Upload a video for AI analysis</h1>
          </div>
          <div className="rounded-full border border-brand-500/20 bg-brand-500/10 px-3 py-1.5 text-sm text-brand-200">
            AI-ready import
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
                <UploadCloud className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-400">New lesson</p>
                <h2 className="text-xl font-semibold">Video metadata</h2>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Video title</label>
                <input
                  defaultValue="How to build a personal learning engine"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-50 outline-none ring-0 placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Topics</label>
                <input
                  defaultValue="learning systems, creator workflow, audience growth"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-50 outline-none ring-0 placeholder:text-slate-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Audience</label>
                <select className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-slate-50 outline-none">
                  <option>Content creators</option>
                  <option>Students</option>
                  <option>Professionals</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-slate-300">Upload video</label>
                <div className="rounded-2xl border border-dashed border-brand-500/30 bg-brand-500/5 p-6 text-center">
                  <p className="text-sm text-slate-300">Drop your file here or click to browse</p>
                  <input type="file" className="mt-4 block w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-brand-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-900" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isAnalyzing}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-4 py-3 font-medium text-slate-900 transition hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing video...
                  </>
                ) : (
                  <>
                    <BrainCircuit className="h-4 w-4" />
                    Analyze with AI
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI learning output</h2>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">Ready</span>
            </div>

            {!analysis ? (
              <div className="grid place-items-center rounded-2xl border border-dashed border-white/10 bg-slate-950/60 p-10 text-center text-slate-400">
                Upload a video and let the AI generate a learning summary.
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-brand-300">Summary</p>
                  <p className="text-slate-200">{analysis.summary}</p>
                </div>

                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-brand-300">Topics</p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.topics.map((topic) => (
                      <span key={topic} className="rounded-full border border-white/10 bg-slate-950 px-3 py-1 text-sm text-slate-200">
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-brand-300">Suggested chapters</p>
                  <ul className="space-y-2 text-slate-200">
                    {analysis.chapters.map((chapter, index) => (
                      <li key={chapter} className="flex gap-3">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/15 text-xs font-semibold text-brand-200">
                          {index + 1}
                        </span>
                        <span>{chapter}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mb-2 text-sm uppercase tracking-[0.2em] text-brand-300">Learning goals</p>
                  <ul className="space-y-2 text-slate-200">
                    {analysis.learningGoals.map((goal) => (
                      <li key={goal} className="flex gap-2">
                        <span className="mt-1 inline-block h-2 w-2 rounded-full bg-brand-500" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full rounded-full border border-brand-500/30 bg-brand-500/10 px-4 py-3 font-medium text-brand-200 hover:bg-brand-500/15">
                  Publish lesson
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
