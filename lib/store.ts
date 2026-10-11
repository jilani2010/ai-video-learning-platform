import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: true,
  setUser: (user) => set({ user }),
  setLoading: (isLoading) => set({ isLoading }),
}));

interface UploadStore {
  uploadProgress: number;
  isUploading: boolean;
  setProgress: (progress: number) => void;
  setUploading: (uploading: boolean) => void;
}

export const useUploadStore = create<UploadStore>((set) => ({
  uploadProgress: 0,
  isUploading: false,
  setProgress: (uploadProgress) => set({ uploadProgress }),
  setUploading: (isUploading) => set({ isUploading }),
}));
