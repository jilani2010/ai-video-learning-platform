import Link from 'next/link';
import { ArrowRight, BrainCircuit, PlayCircle, Sparkles, TrendingUp } from 'lucide-react';
import { featuredLessons, platformStats, socialFeed } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-500 ring-1 ring-brand-500/30">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-bold">LearnLoop AI</p>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
            <Link href="#feed">Feed</Link>
            <Link href="#features">Features</Link>
            <Link href="#insights">Insights</Link>
            <Link href="/upload">Upload</Link>
            <Link href="/dashboard">Dashboard</Link>
          </nav>

          <Link
            href="/upload"
            className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-brand-400"
          >
            Publish lesson <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-500/10 px-3 py-1.5 text-sm text-brand-300">
            <Sparkles className="h-4 w-4" />
            Video to lesson in minutes
          </div>

          <h1 className="max-w-xl text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
            Social learning, supercharged by AI.
          </h1>

          <p className="mt-6 max-w-lg text-lg text-slate-300">
            Turn long-form video content into polished learning experiences, community-driven insights, and publish-ready lessons.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-slate-900 transition hover:bg-slate-200"
            >
              <PlayCircle className="h-4 w-4" />
              Upload video
            </Link>
            <Link href="#feed" className="text-sm font-medium text-slate-200 underline decoration-slate-500 underline-offset-4">
              Explore feed
            </Link>
          </div>

          <div className="mt-10 grid max-w-xl grid-cols-3 gap-4">
            {platformStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-2xl font-bold text-brand-400">{stat.value}</p>
                <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 p-6 shadow-glow">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">AI video analysis</p>
              <p className="text-xl font-bold">Learning summary</p>
            </div>
            <div className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300 ring-1 ring-emerald-500/30">
              Live
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-brand-500/20 bg-brand-500/10 p-3">
              <p className="text-xs uppercase tracking-[0.2em] text-brand-300">Detected themes</p>
              <p className="mt-2 text-lg font-semibold">Growth strategy, content systems, automation</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-3">
                <p className="text-xs text-slate-400">Transcript confidence</p>
                <p className="mt-2 text-2xl font-bold text-white">96%</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-900 p-3">
                <p className="text-xs text-slate-400">Key takeaways</p>
                <p className="mt-2 text-2xl font-bold text-white">8</p>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-900 p-4">
              <p className="text-sm text-slate-400">Suggested chapter flow</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-200">
                {['Hook + pain point', 'Content systems', 'Audience building', 'Conversion playbook'].map((step) => (
                  <li key={step} className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-brand-500" />
                    {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-300">Why creators use it</p>
            <h2 className="mt-3 text-3xl font-bold">Designed for AI-powered learning communities</h2>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {featuredLessons.map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/10 bg-slate-900/80 p-5">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-500/10 text-brand-300">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-slate-300">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="feed" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-300">Community feed</p>
            <h2 className="mt-3 text-3xl font-bold">Explore learnings worth sharing</h2>
          </div>
          <Link href="/dashboard" className="text-sm font-medium text-brand-300">
            View dashboard →
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {socialFeed.map((post) => (
            <article key={post.id} className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
              <div className="h-48 bg-gradient-to-br from-brand-500/20 via-slate-800 to-slate-900 p-5">
                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span>{post.category}</span>
                  <span>{post.duration}</span>
                </div>
                <div className="mt-12 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
                    {post.creator[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{post.creator}</p>
                    <p className="text-xs text-slate-400">{post.role}</p>
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-brand-300">AI summary</p>
                <h3 className="mt-3 text-xl font-semibold text-white">{post.title}</h3>
                <p className="mt-3 text-sm text-slate-300">{post.summary}</p>

                <div className="mt-5 flex items-center justify-between text-sm text-slate-400">
                  <span>{post.views} views</span>
                  <span>{post.engagement} engagement</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="insights" className="mx-auto max-w-7xl px-6 pb-24">
        <div className="rounded-3xl border border-brand-500/20 bg-brand-500/10 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-brand-200">AI insight</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Your best learning moments are hidden in your footage.</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-medium text-slate-900">
              <TrendingUp className="h-4 w-4" />
              +42% engagement lift
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
