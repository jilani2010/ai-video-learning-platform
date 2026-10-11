"use client";

import Link from 'next/link';
import { UserButton } from '@clerk/nextjs';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { BrainCircuit, Search } from 'lucide-react';

export function Navbar() {
  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-500/15 text-brand-500 ring-1 ring-brand-500/30">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold">LearnLoop AI</span>
        </Link>

        <div className="hidden flex-1 items-center gap-2 px-8 md:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search lessons..."
            className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center gap-4">
          <nav className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <Link href="/feed" className="hover:text-white transition">
              Feed
            </Link>
            <Link href="/upload" className="hover:text-white transition">
              Upload
            </Link>
          </nav>

          <SignedOut>
            <div className="flex items-center gap-2">
              <Link href="/sign-in" className="text-sm font-medium text-slate-300 hover:text-white">
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-brand-400"
              >
                Sign up
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="hidden rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-slate-900 hover:bg-brand-400 sm:inline-block"
            >
              Dashboard
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-10 h-10",
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
