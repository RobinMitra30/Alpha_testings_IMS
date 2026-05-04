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
    <header className="h-16 border-bottom border-slate-200 bg-white flex items-center justify-between px-8 z-10 sticky top-0">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-medium tracking-tight text-slate-900 italic font-serif">/ {title}</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
          <Input 
            type="search" 
            placeholder="Search documents..." 
            className="pl-9 h-9 bg-slate-50 border-slate-200 focus:bg-white focus:ring-1 focus:ring-orange-500 rounded-sm"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 transition-colors relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-600 rounded-full border-2 border-white"></span>
          </Button>
        </div>
      </div>
    </header>
  );
}
