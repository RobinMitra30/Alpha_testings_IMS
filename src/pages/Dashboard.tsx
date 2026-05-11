import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  ClipboardCheck,
  Zap,
  Activity,
  HardHat,
  Clock,
  Camera,
  Plus
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { NavLink } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">Project Command Center</h1>
          <p className="text-slate-500 text-sm">Site visibility, workforce metrics, and progress tracking.</p>
        </div>
        <div className="flex items-center gap-2">
           <NavLink to="/progress">
             <Button variant="outline" size="sm" className="h-9 gap-2 border-slate-200">
               <Camera className="w-4 h-4 text-blue-600" />
               View Site Photos
             </Button>
           </NavLink>
           <NavLink to="/attendance">
             <Button className="h-9 bg-blue-600 hover:bg-blue-700 gap-2">
               <Plus className="w-4 h-4" />
               Mark Attendance
             </Button>
           </NavLink>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Workforce On-Site', value: '124', trend: '+8', up: true, icon: HardHat, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Tasks Completed', value: '82%', trend: '+4%', up: true, icon: ClipboardCheck, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Material Costs (MTD)', value: '₹1.8M', trend: 'Budgeted', up: null, icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Open Issues', value: '12', trend: '-2', up: false, icon: AlertCircle, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, i) => (
          <Card key={i} className="hover:shadow-md transition-shadow cursor-default border-slate-200">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                {stat.up !== null && (
                  <div className={`flex items-center text-xs font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.up ? <ArrowUpRight className="w-3.5 h-3.5" /> : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {stat.trend}
                  </div>
                )}
                {stat.up === null && (
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{stat.trend}</span>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between py-4 px-6">
               <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">Project Feed & Updates</CardTitle>
               <Button variant="ghost" size="sm" className="text-xs text-blue-600 font-bold">See All Activity</Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                 {[
                   { type: 'DPR Submitted', ref: 'Skyline Residency', user: 'Amit Singh', time: '10m ago', icon: FileText, color: 'text-blue-500' },
                   { type: 'Material Received', ref: 'GRN-98210', user: 'Sunil (Store)', time: '2h ago', icon: Zap, color: 'text-green-500' },
                   { type: 'Flagged Issue', ref: 'Curing Delay (Block B)', user: 'QC Team', time: '5h ago', icon: AlertCircle, color: 'text-red-500' },
                   { type: 'Task Completed', ref: '3rd Floor Plaster', user: 'Rajesh Contractor', time: '1d ago', icon: Activity, color: 'text-indigo-500' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4 px-6 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center`}>
                           <item.icon className={`w-4 h-4 ${item.color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{item.type} <span className="text-slate-400 font-mono text-xs ml-2">@{item.ref}</span></p>
                          <p className="text-xs text-slate-500 flex items-center gap-2 italic font-medium">
                            {item.user} • {item.time}
                          </p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-400">
                         <ArrowUpRight className="w-4 h-4" />
                      </Button>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm border-l-4 border-l-red-500">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 px-6 py-4">
              <CardTitle className="text-sm font-bold text-slate-700 uppercase tracking-wider">Site Risks</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-1 bg-red-600 h-10 rounded-full"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Resource Shortage</p>
                      <p className="text-xs text-slate-500 font-medium">Labor count is 20% below target in Skyline.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-1 bg-orange-400 h-10 rounded-full"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Delayed Procurement</p>
                      <p className="text-xs text-slate-500 font-medium">Cement PO #88123 delivery expected 2 days late.</p>
                    </div>
                 </div>
               </div>
            </CardContent>
          </Card>
          
          <div className="bg-blue-600 p-8 rounded-xl text-white relative overflow-hidden group shadow-lg">
             <div className="relative z-10">
               <Clock className="w-10 h-10 text-blue-200 mb-4" />
               <h4 className="text-lg font-bold mb-2 italic">Generate Daily Stats</h4>
               <p className="text-xs text-blue-100 mb-6 leading-relaxed">Download a comprehensive report of all sites for the last 24 hours.</p>
               <Button className="w-full bg-white text-blue-600 hover:bg-blue-50 border-none font-bold">Download Summary</Button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500 rounded-full blur-[60px] group-hover:bg-blue-400 transition-colors"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
