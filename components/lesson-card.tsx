"use client";

import Link from 'next/link';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface LessonCardProps {
  id: string;
  title: string;
  description?: string;
  creator: {
    name?: string;
    avatar?: string;
  };
  category?: string;
  views?: number;
  likes?: number;
  comments?: number;
  onLike?: () => void;
}

export function LessonCard({
  id,
  title,
  description,
  creator,
  category,
  views = 0,
  likes = 0,
  comments = 0,
  onLike,
}: LessonCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lessonId: id }),
      });

      if (!response.ok) throw new Error();
      const data = await response.json();
      setIsLiked(data.liked);
      onLike?.();
    } catch (error) {
      toast.error('Failed to like lesson');
    }
  };

  return (
    <article className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900 transition hover:border-brand-500/20">
      <div className="h-48 bg-gradient-to-br from-brand-500/20 via-slate-800 to-slate-900 p-5">
        <div className="flex items-center justify-between text-xs text-slate-300">
          <span className="rounded-full bg-white/10 px-2.5 py-1">{category || 'Learning'}</span>
          <span>{views} views</span>
        </div>
        <div className="mt-12 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white">
            {creator.name?.[0] || 'U'}
          </div>
          <div>
            <p className="font-semibold text-white">{creator.name || 'Unknown'}</p>
            <p className="text-xs text-slate-400">Creator</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        <Link href={`/lessons/${id}`}>
          <h3 className="text-xl font-semibold text-white hover:text-brand-300 transition">{title}</h3>
        </Link>
        {description && <p className="mt-3 text-sm text-slate-300 line-clamp-2">{description}</p>}

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-4 text-sm text-slate-400">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-brand-300 transition"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              {likes}
            </button>
            <Link href={`/lessons/${id}#comments`} className="flex items-center gap-1 hover:text-brand-300 transition">
              <MessageCircle className="h-4 w-4" />
              {comments}
            </Link>
          </div>
          <button className="text-slate-400 hover:text-brand-300 transition">
            <Share2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </article>
  );
}
