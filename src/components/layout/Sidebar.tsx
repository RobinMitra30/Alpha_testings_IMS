import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  Box, 
  Briefcase, 
  ClipboardList, 
  FileCheck, 
  LayoutDashboard, 
  LogOut, 
  Package, 
  Settings, 
  ShoppingCart, 
  Truck, 
  Users 
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { UserRole } from '@/types';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE, UserRole.QC, UserRole.ACCOUNTS] },
  { name: 'Products', href: '/products', icon: Package, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE] },
  { name: 'Projects', href: '/projects', icon: Briefcase, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { name: 'Vendors', href: '/vendors', icon: Truck, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { name: 'Requisitions', href: '/requisitions', icon: ClipboardList, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE] },
  { name: 'Orders', href: '/orders', icon: ShoppingCart, roles: [UserRole.ADMIN, UserRole.MANAGER] },
  { name: 'GRNs', href: '/grns', icon: FileCheck, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE, UserRole.QC] },
  { name: 'Inventory', href: '/inventory', icon: Box, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.STORE] },
  { name: 'Reports', href: '/reports', icon: BarChart3, roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.ACCOUNTS] },
  { name: 'Admin', href: '/admin', icon: Settings, roles: [UserRole.ADMIN] },
];

export function Sidebar() {
  const { profile, logout } = useAuth();

  const isDev = profile?.email === 'structuremakers.india@gmail.com';

  const filteredNavigation = navigation.filter(
    (item) => !profile || item.roles.includes(profile.role) || (isDev && item.name === 'Admin')
  );

  return (
    <div className="flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 h-screen overflow-y-auto font-sans">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-600 rounded-sm flex items-center justify-center text-white font-bold">CP</div>
        <div>
          <h1 className="text-white font-semibold tracking-tight">ConstructPro</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">Inventory MS</p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-1">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all duration-200 group",
                isActive 
                  ? "bg-slate-800 text-white border-l-2 border-orange-500 rounded-l-none pl-2" 
                  : "hover:bg-slate-800 hover:text-white"
              )
            }
          >
            <item.icon className="w-4 h-4" />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mt-auto border-t border-slate-800">
        <div className="flex items-center gap-3 mb-4 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-medium text-white uppercase">
            {profile?.name?.charAt(0) || 'U'}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-medium text-white truncate">{profile?.name || 'User'}</p>
            <p className="text-[10px] text-slate-500 uppercase font-mono">{profile?.role || 'Loading...'}</p>
          </div>
        </div>
        <Button 
          variant="ghost" 
          onClick={logout}
          className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800 h-9"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </Button>
      </div>
    </div>
  );
}
