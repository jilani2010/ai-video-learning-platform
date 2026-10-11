import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function uploadVideo(file: File, userId: string) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${fileExt}`;

  const { error, data } = await supabase.storage
    .from('videos')
    .upload(fileName, file);

  if (error) throw error;
  
  return data;
}

export async function getPublicVideoUrl(path: string) {
  const { data } = supabase.storage.from('videos').getPublicUrl(path);
  return data.publicUrl;
}
