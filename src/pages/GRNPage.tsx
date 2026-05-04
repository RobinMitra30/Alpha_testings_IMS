import React, { useState, useEffect } from 'react';
import { GRNService, POService, InventoryService, ProjectService, VendorService } from '@/services/store';
import { GRN, PurchaseOrder, Project, Vendor, UserRole } from '@/types';
import { useAuth } from '@/lib/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, CheckCircle2, XCircle, Clock, FileText, Filter, ClipboardList } from 'lucide-react';
import { toast } from 'sonner';

export default function GRNPage() {
  const { profile } = useAuth();
  const [grns, setGrns] = useState<GRN[]>([]);
  const [pos, setPos] = useState<PurchaseOrder[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedPoId, setSelectedPoId] = useState<string>('');
  
  // Form State
  const [grnNumber, setGrnNumber] = useState(`GRN-${Date.now().toString().slice(-6)}`);
  const [challanNumber, setChallanNumber] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    const unsubGrn = GRNService.subscribe(setGrns);
    const unsubPo = POService.subscribe(setPos);
    return () => { unsubGrn(); unsubPo(); };
  }, []);

  const handlePoSelect = (poId: string) => {
    setSelectedPoId(poId);
    const po = pos.find(p => p.id === poId);
    if (po) {
      setItems(po.items.map(item => ({
        productId: item.productId,
        orderedQuantity: item.quantityOrdered,
        receivedQuantity: item.quantityOrdered - item.quantityReceived,
        rejectedQuantity: 0,
        qcStatus: 'PASSED'
      })));
    }
  };

  const handleCreate = async () => {
    if (!selectedPoId) return toast.error('Select a PO first');
    const po = pos.find(p => p.id === selectedPoId)!;

    try {
      await GRNService.create({
        grnNumber,
        poId: selectedPoId,
        projectId: po.projectId,
        vendorId: po.vendorId,
        challanNumber,
        items,
        qcStatus: 'PENDING',
        status: 'PENDING_APPROVAL',
        receivedBy: profile?.uid || 'unknown',
        siteLocation,
        createdAt: new Date().toISOString()
      });
      setIsAddOpen(false);
      toast.success('GRN submitted for approval');
    } catch (err) {
      toast.error('Failed to create GRN');
    }
  };

  const handleApprove = async (grnId: string) => {
    if (profile?.role !== UserRole.MANAGER && profile?.role !== UserRole.ADMIN) {
      return toast.error('Unauthorized');
    }
    try {
      await InventoryService.approveGRN(grnId, profile.uid);
      toast.success('GRN Approved & Stock Updated');
    } catch (err) {
      toast.error('Approval failed');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'APPROVED': return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 uppercase text-[10px] font-mono">Approved</Badge>;
      case 'PENDING_APPROVAL': return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border-orange-200 uppercase text-[10px] font-mono">Pending</Badge>;
      case 'REJECTED': return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200 uppercase text-[10px] font-mono">Rejected</Badge>;
      default: return <Badge variant="outline" className="uppercase text-[10px] font-mono text-slate-400">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif italic">Goods Receipt Notes</h1>
          <p className="text-slate-500 text-sm">PR → PO → <span className="text-orange-600 font-bold underline">GRN</span> → Stock Update</p>
        </div>

        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={
            <Button className="bg-orange-600 hover:bg-orange-700 h-10 gap-2">
              <Plus className="w-4 h-4" /> Create GRN
            </Button>
          } />
          <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex justify-between items-center pr-8">
                <span>New Goods Receipt Note</span>
                <span className="text-sm font-mono text-slate-400 uppercase tracking-widest">{grnNumber}</span>
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Purchase Order (PO)</Label>
                  <Select onValueChange={handlePoSelect}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select PO..." />
                    </SelectTrigger>
                    <SelectContent>
                      {pos.filter(po => po.status !== 'COMPLETED').map(po => (
                        <SelectItem key={po.id} value={po.id}>PO-{po.id.slice(-6)} (Project: {po.projectId})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Challan Number</Label>
                  <Input value={challanNumber} onChange={e => setChallanNumber(e.target.value)} placeholder="Delivery Challan #" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Site Location / Gate No.</Label>
                <Input value={siteLocation} onChange={e => setSiteLocation(e.target.value)} placeholder="e.g. Site A - Warehouse 2" />
              </div>

              <div className="border border-slate-200 rounded-sm overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-50">
                    <TableRow className="text-[10px] font-mono uppercase tracking-tighter">
                      <TableHead>Product</TableHead>
                      <TableHead>Ordered</TableHead>
                      <TableHead>Received</TableHead>
                      <TableHead>Rejected</TableHead>
                      <TableHead>QC</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-medium text-xs truncate max-w-[150px]">{item.productId}</TableCell>
                        <TableCell className="font-mono text-xs">{item.orderedQuantity}</TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="h-8 w-20 py-1 text-xs" 
                            value={item.receivedQuantity}
                            onChange={e => {
                               const newItems = [...items];
                               newItems[idx].receivedQuantity = Number(e.target.value);
                               setItems(newItems);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Input 
                            type="number" 
                            className="h-8 w-20 py-1 text-xs" 
                            value={item.rejectedQuantity}
                            onChange={e => {
                               const newItems = [...items];
                               newItems[idx].rejectedQuantity = Number(e.target.value);
                               setItems(newItems);
                            }}
                          />
                        </TableCell>
                        <TableCell>
                           <Select 
                             value={item.qcStatus} 
                             onValueChange={v => {
                               const newItems = [...items];
                               newItems[idx].qcStatus = v;
                               setItems(newItems);
                             }}
                           >
                             <SelectTrigger className="h-8 w-24 text-[10px]">
                               <SelectValue />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="PASSED">Passed</SelectItem>
                               <SelectItem value="FAILED">Failed</SelectItem>
                             </SelectContent>
                           </Select>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} className="bg-orange-600 hover:bg-orange-700">Submit for Approval</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm h-[600px] flex flex-col">
        <div className="p-4 border-b border-slate-100 flex items-center gap-3">
           <Filter className="w-4 h-4 text-slate-400" />
           <span className="text-xs font-mono text-slate-500 uppercase tracking-widest">Filters applied: All Transactions</span>
        </div>
        <div className="flex-1 overflow-auto">
          <Table>
            <TableHeader className="bg-white sticky top-0 z-10 shadow-sm">
              <TableRow className="text-[10px] font-mono uppercase tracking-widest italic">
                <TableHead className="w-[150px]">GRN Number</TableHead>
                <TableHead>PO Ref</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {grns.map((grn) => (
                <TableRow key={grn.id} className="group transition-colors hover:bg-slate-50/50">
                  <TableCell className="font-mono text-xs font-semibold text-slate-900">{grn.grnNumber}</TableCell>
                  <TableCell className="font-mono text-xs text-slate-500">#{grn.poId.slice(-6)}</TableCell>
                  <TableCell className="text-xs text-slate-600">{new Date(grn.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-xs">{grn.siteLocation}</TableCell>
                  <TableCell>{getStatusBadge(grn.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      {grn.status === 'PENDING_APPROVAL' && (profile?.role === UserRole.MANAGER || profile?.role === UserRole.ADMIN) && (
                        <>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleApprove(grn.id)}
                            className="h-8 border-green-200 text-green-700 hover:bg-green-50 gap-1 px-3"
                          >
                            <CheckCircle2 className="w-3 h-3" /> Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={async () => {
                              try {
                                await GRNService.updateStatus(grn.id, 'REJECTED');
                                toast.success('GRN Rejected');
                              } catch (err) {
                                toast.error('Rejection failed');
                              }
                            }}
                            className="h-8 border-red-200 text-red-700 hover:bg-red-50 gap-1 px-3"
                          >
                            <XCircle className="w-3 h-3" /> Reject
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
                         <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {grns.length === 0 && (
                <TableRow>
                   <TableCell colSpan={6} className="h-64 text-center">
                     <div className="flex flex-col items-center gap-2 opacity-30">
                       <ClipboardList className="w-12 h-12" />
                       <p className="italic font-serif">No GRN records found.</p>
                     </div>
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
