import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LearnLoop AI',
  description: 'A social media AI-powered learning platform for video creators and learners.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
