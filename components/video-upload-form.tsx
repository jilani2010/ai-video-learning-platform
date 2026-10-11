"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { UploadCloud, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface VideoUploadFormProps {
  onSuccess?: (videoId: string) => void;
}

export function VideoUploadForm({ onSuccess }: VideoUploadFormProps) {
  const router = useRouter();
  const [isUploading, setIsUploading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      title: '',
      description: '',
      topics: '',
      audience: 'creators',
    },
  });

  const videoFile = watch('video');

  const onSubmit = async (data: any) => {
    setIsUploading(true);
    try {
      // In a real app, upload to Supabase first
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('videoUrl', 'https://placeholder-video.mp4');
      formData.append('duration', '900');

      const response = await fetch('/api/videos', {
        method: 'POST',
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          videoUrl: 'https://placeholder-video.mp4',
          duration: 900,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Upload failed');

      const video = await response.json();
      toast.success('Video uploaded successfully!');
      onSuccess?.(video.id);
      router.push(`/upload/${video.id}`);
    } catch (error) {
      toast.error('Failed to upload video');
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Video Title
        </label>
        <input
          {...register('title', { required: 'Title is required' })}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          placeholder="Enter video title"
        />
        {errors.title && <p className="mt-1 text-sm text-red-400">{String(errors.title.message)}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description
        </label>
        <textarea
          {...register('description')}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          placeholder="Describe your video content"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Topics
        </label>
        <input
          {...register('topics')}
          className="w-full rounded-2xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500"
          placeholder="e.g. AI, education, content creation"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Upload Video File
        </label>
        <div className="rounded-2xl border-2 border-dashed border-brand-500/30 bg-brand-500/5 p-6 text-center">
          <input
            {...register('video', { required: 'Video file is required' })}
            type="file"
            accept="video/*"
            className="block w-full text-sm text-slate-300 file:mr-4 file:rounded-full file:border-0 file:bg-brand-500 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-900"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isUploading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 font-medium text-slate-900 hover:bg-brand-400 disabled:opacity-50"
      >
        {isUploading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Uploading...
          </>
        ) : (
          <>
            <UploadCloud className="h-4 w-4" />
            Upload Video
          </>
        )}
      </button>
    </form>
  );
}
