import Link from 'next/link';
import { ArrowLeft, BarChart3, CheckCircle2, FileVideo, Sparkles } from 'lucide-react';

const recentLessons = [
  { title: 'AI Content Systems for Solopreneurs', status: 'Ready to publish', type: 'Video lesson' },
  { title: 'The Design Behind Better Learning', status: 'Reviewing summary', type: 'Knowledge clip' },
  { title: 'From Podcast to Course', status: 'Awaiting approval', type: 'Short form' }
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link href="/" className="mb-4 inline-flex items-center gap-2 text-sm text-slate-300">
              <ArrowLeft className="h-4 w-4" />
              Back home
            </Link>
            <h1 className="text-3xl font-bold">Creator dashboard</h1>
          </div>
          <Link href="/upload" className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-slate-900">
            New upload
          </Link>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {[
            { label: 'Videos analyzed', value: '1,248', icon: FileVideo },
            { label: 'Lessons published', value: '418', icon: CheckCircle2 },
            { label: 'Avg. engagement', value: '8.4%', icon: BarChart3 }
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-slate-900 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-300">
                <item.icon className="h-5 w-5" />
              </div>
              <p className="text-sm text-slate-400">{item.label}</p>
              <p className="mt-2 text-3xl font-bold text-white">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Recent lessons</h2>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">Synced</span>
            </div>

            <div className="space-y-4">
              {recentLessons.map((lesson) => (
                <div key={lesson.title} className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/60 p-4">
                  <div>
                    <p className="font-medium text-white">{lesson.title}</p>
                    <p className="mt-1 text-sm text-slate-400">{lesson.type}</p>
                  </div>
                  <span className="rounded-full border border-brand-500/30 bg-brand-500/10 px-2.5 py-1 text-xs text-brand-300">
                    {lesson.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/10 text-brand-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-400">AI assistant</p>
                <h3 className="font-semibold text-white">Publishing recommendation</h3>
              </div>
            </div>

            <div className="mt-5 rounded-2xl border border-brand-500/20 bg-brand-500/10 p-4 text-sm text-slate-200">
              This video has a strong learning arc and should publish as a 12-minute micro-course with a downloadable PDF and discussion prompt.
            </div>

            <ul className="mt-5 space-y-3 text-sm text-slate-300">
              <li>• Key themes: system design, retention, content planning</li>
              <li>• Best format: short-form + guided transcript</li>
              <li>• Suggested publish time: Friday 6PM</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
