import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const data = [
  { name: 'Jan', received: 400, consumed: 240 },
  { name: 'Feb', received: 300, consumed: 139 },
  { name: 'Mar', received: 200, consumed: 980 },
  { name: 'Apr', received: 278, consumed: 390 },
  { name: 'May', received: 189, consumed: 480 },
];

const COLORS = ['#0f172a', '#ea580c', '#3b82f6', '#10b981'];

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif italic">Analytics Dashboard</h1>
        <p className="text-slate-500 text-sm">Strategic reports and trend analysis.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="rounded-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
             <CardTitle className="text-xs font-mono uppercase tracking-widest text-slate-500">Material Trends (Received vs Consumed)</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" fontSize={11} axisLine={false} tickLine={false} />
                  <YAxis fontSize={11} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '0', border: '1px solid #e2e8f0', fontFamily: 'monospace' }}
                  />
                  <Bar dataKey="received" fill="#ea580c" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="consumed" fill="#0f172a" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-sm border-slate-200">
          <CardHeader className="bg-slate-50/50 border-b border-slate-100">
             <CardTitle className="text-xs font-mono uppercase tracking-widest text-slate-500">Category-wise Expenditure</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Cement', value: 400 },
                      { name: 'Steel', value: 300 },
                      { name: 'Electrical', value: 300 },
                      { name: 'Plumbing', value: 200 },
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 text-[10px] uppercase font-mono tracking-tighter">
                 {['Cement', 'Steel', 'Elec', 'Plumb'].map((cat, i) => (
                    <div key={i} className="flex items-center gap-2">
                       <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i] }}></span>
                       <span>{cat}</span>
                    </div>
                 ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-sm border-slate-200">
        <CardHeader className="bg-slate-50/50 border-b border-slate-100">
          <CardTitle className="text-xs font-mono uppercase tracking-widest text-slate-500">Inventory Turnover Rate</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" fontSize={11} axisLine={false} tickLine={false} />
                <YAxis fontSize={11} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="received" stroke="#ea580c" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
