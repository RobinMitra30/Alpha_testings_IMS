import React from 'react';
import { 
  TrendingUp, 
  Users, 
  FileText, 
  AlertCircle, 
  ArrowUpRight, 
  ArrowDownRight,
  ClipboardCheck,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif italic">Operational Control</h1>
          <p className="text-slate-500">Inventory intelligence and procurement workflow metrics.</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-1 rounded-sm border border-slate-200 shadow-sm">
           <Button variant="ghost" size="sm" className="h-8 text-xs font-mono uppercase tracking-widest text-orange-600">Site Status</Button>
           <div className="w-px h-4 bg-slate-200"></div>
           <Button variant="ghost" size="sm" className="h-8 text-xs font-mono uppercase tracking-widest">Procurement</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Purchases (MTD)', value: '₹4.2M', trend: '+12%', up: true, icon: TrendingUp, color: 'text-green-600' },
          { label: 'Active Vendors', value: '42', trend: 'Stable', up: null, icon: Users, color: 'text-blue-600' },
          { label: 'Open POs', value: '18', trend: '-2', up: false, icon: FileText, color: 'text-orange-600' },
          { label: 'QC Rejections', value: '03', trend: 'Low', up: true, icon: AlertCircle, color: 'text-red-600' },
        ].map((stat, i) => (
          <Card key={i} className="rounded-sm border-slate-200 hover:shadow-md transition-shadow cursor-default">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-sm bg-slate-50 ${stat.color}`}>
                  <stat.icon className="w-4 h-4" />
                </div>
                {stat.up !== null && (
                  <div className={`flex items-center text-[10px] font-bold ${stat.up ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                    {stat.trend}
                  </div>
                )}
              </div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-mono">{stat.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1 tracking-tight">{stat.value}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="rounded-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100 flex flex-row items-center justify-between py-4">
               <CardTitle className="text-xs font-mono uppercase tracking-widest text-slate-500">Recent Procurement Activity</CardTitle>
               <Button variant="link" size="sm" className="text-xs text-orange-600">View All</Button>
            </CardHeader>
            <CardContent className="p-0">
               <div className="divide-y divide-slate-100">
                 {[
                   { type: 'GRN Approved', ref: 'GRN-98210', user: 'Admin', time: '2h ago', status: 'Approved' },
                   { type: 'PO Created', ref: 'PO-88123', user: 'Manager', time: '5h ago', status: 'Pending' },
                   { type: 'PR Rejected', ref: 'PR-11223', user: 'Admin', time: '1d ago', status: 'Action Needed' },
                   { type: 'Stock In', ref: 'ITEM-221', user: 'System', time: '1d ago', status: 'Success' },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center justify-between p-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                           <Zap className="w-4 h-4 text-slate-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-slate-900">{item.type} <span className="text-slate-400 font-mono text-xs ml-2">#{item.ref}</span></p>
                          <p className="text-xs text-slate-500 flex items-center gap-2 italic">
                            {item.user} • {item.time}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline" className="font-mono text-[9px] uppercase tracking-tighter">{item.status}</Badge>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="rounded-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b border-slate-100">
              <CardTitle className="text-xs font-mono uppercase tracking-widest text-slate-500">Compliance & Alerts</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
               <div className="space-y-6">
                 <div className="flex gap-4">
                    <div className="w-1 bg-red-600 h-12 rounded-full"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Delayed GRN Approval</p>
                      <p className="text-xs text-slate-500">3 GRNs pending approval for {'>'} 48 hours.</p>
                      <Button variant="link" size="sm" className="h-6 p-0 text-red-600 text-[10px] uppercase font-mono tracking-widest">Act Now</Button>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-1 bg-orange-400 h-12 rounded-full"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Low Stock Alert</p>
                      <p className="text-xs text-slate-500">PVC Pipes 4" SKU is critical in Site B.</p>
                    </div>
                 </div>
                 <div className="flex gap-4">
                    <div className="w-1 bg-green-500 h-12 rounded-full"></div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Audit Complete</p>
                      <p className="text-xs text-slate-500 text-green-700">Monthly reconciliation successful.</p>
                    </div>
                 </div>
               </div>
            </CardContent>
          </Card>
          
          <div className="bg-slate-900 p-8 rounded-sm text-slate-300 relative overflow-hidden group">
             <div className="relative z-10">
               <ClipboardCheck className="w-10 h-10 text-orange-500 mb-4" />
               <h4 className="text-white font-bold mb-2 italic font-serif">Quick PR Request</h4>
               <p className="text-xs text-slate-500 mb-6 leading-relaxed">Raise a material request instantly for site consumption.</p>
               <Button className="w-full bg-orange-600 hover:bg-orange-700 border-none">Start Requisition</Button>
             </div>
             <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-slate-800 rounded-full blur-[60px] group-hover:bg-slate-700 transition-colors"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
