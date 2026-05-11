import React from 'react';
import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const location = useLocation();
  const path = location.pathname.split('/').slice(-1)[0] || 'Dashboard';
  const title = path.charAt(0).toUpperCase() + path.slice(1);

  return (
    <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-between px-8 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold tracking-tight text-slate-800 uppercase tracking-widest text-[11px]">/ {title}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search across project data..." 
            className="pl-9 h-9 bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-1 focus:ring-blue-600 rounded-lg text-xs"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="text-slate-500 hover:text-slate-900 transition-colors relative border-slate-200 h-9 w-9 rounded-lg">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
          </Button>
        </div>
      </div>
    </header>
  );
}
