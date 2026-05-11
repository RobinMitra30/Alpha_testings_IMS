import React from 'react';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { LogIn } from 'lucide-react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, login, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest">Waking up the site OS...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
        <div className="max-w-md w-full text-center space-y-12 bg-white p-12 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.07)] border border-slate-100">
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-blue-600 rounded-xl flex items-center justify-center text-white text-5xl font-bold italic shadow-xl">P</div>
          </div>
          <div className="space-y-3">
            <h1 className="text-4xl font-bold text-slate-900 tracking-tighter">Powerplay</h1>
            <p className="text-slate-500 font-medium italic">Your site, in your pocket.</p>
          </div>
          <div className="space-y-4">
            <Button onClick={login} className="w-full h-14 gap-3 text-lg bg-blue-600 hover:bg-blue-700 transition-all font-bold rounded-xl shadow-lg shadow-blue-200">
              <LogIn className="w-5 h-5" />
              Sign in to Project
            </Button>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Enterprise Access</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
