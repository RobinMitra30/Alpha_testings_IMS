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
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-mono text-slate-500 uppercase tracking-widest">Initializing System...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="max-w-md w-full text-center space-y-8 bg-white p-10 rounded-xl shadow-2xl">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-lg transform rotate-6">CP</div>
          </div>
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">ConstructPro</h1>
            <p className="text-slate-500">Enterprise Inventory & Project Management</p>
          </div>
          <Button onClick={login} className="w-full h-12 gap-3 text-lg bg-orange-600 hover:bg-orange-700 transition-all">
            <LogIn className="w-5 h-5" />
            Sign in with Google
          </Button>
          <p className="text-xs text-slate-400 font-mono">AUTHORIZED PERSONNEL ONLY</p>
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
