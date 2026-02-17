'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // Add a small delay to ensure auth context is initialized
    const timeout = setTimeout(() => {
      if (!loading) {
        if (user) {
          router.push('/dashboard');
        } else {
          router.push('/login');
        }
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [user, loading, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="animate-pulse text-lg text-white mb-4">Loading...</div>
      <div className="text-sm text-slate-400">Initializing application</div>
    </div>
  );
}
