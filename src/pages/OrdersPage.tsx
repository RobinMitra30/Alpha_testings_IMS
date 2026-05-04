import React, { useState, useEffect } from 'react';
import { POService, ProjectService, VendorService } from '@/services/store';
import { PurchaseOrder, Project, Vendor } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { ShoppingCart, FilePlus, Filter } from 'lucide-react';

export default function OrdersPage() {
  const [pos, setPos] = useState<PurchaseOrder[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    const unsubPo = POService.subscribe(setPos);
    const unsubProject = ProjectService.subscribe(setProjects);
    const unsubVendor = VendorService.subscribe(setVendors);
    return () => { unsubPo(); unsubProject(); unsubVendor(); };
  }, []);

  const enrichedPos = pos.map(po => ({
    ...po,
    project: projects.find(p => p.id === po.projectId),
    vendor: vendors.find(v => v.id === po.vendorId)
  }));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif italic">Purchase Orders</h1>
          <p className="text-slate-500 text-sm">Track official orders and vendor performance.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 h-10 gap-2">
          <FilePlus className="w-4 h-4" /> Create PO
        </Button>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
           <div className="flex gap-4">
             <Button variant="outline" size="sm" className="h-8 gap-2"><Filter className="w-3 h-3" /> All Statuses</Button>
             <Button variant="outline" size="sm" className="h-8 gap-2"><Filter className="w-3 h-3" /> All Vendors</Button>
           </div>
           <div className="text-[10px] uppercase font-mono tracking-widest text-slate-400">
             Scroll horizontally for line items
           </div>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="text-[10px] font-mono uppercase tracking-widest italic bg-white">
                <TableHead>PO ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Vendor</TableHead>
                <TableHead>Items</TableHead>
                <TableHead className="text-right">Total (Inc Tax)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-sm">
              {enrichedPos.map((po) => (
                <TableRow key={po.id} className="hover:bg-slate-50 transition-colors cursor-pointer">
                  <TableCell className="font-mono text-xs font-bold">#{po.id.slice(-6)}</TableCell>
                  <TableCell className="font-medium">{po.project?.name || 'Loading...'}</TableCell>
                  <TableCell>{po.vendor?.name || 'Loading...'}</TableCell>
                  <TableCell>{po.items.length} materials</TableCell>
                  <TableCell className="text-right font-mono font-bold">₹{po.totalAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="uppercase text-[9px] font-mono tracking-tight">{po.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right text-xs text-slate-400 italic">
                    {new Date(po.createdAt).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
              {enrichedPos.length === 0 && (
                <TableRow>
                   <TableCell colSpan={7} className="h-48 text-center text-slate-400 italic font-serif">
                      No active purchase orders. Use "Create PO" to initiate procurement.
                   </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
