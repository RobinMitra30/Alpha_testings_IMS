import React, { useState, useEffect } from 'react';
import { InventoryService, ProductService, ProjectService } from '@/services/store';
import { Stock, Product, Project } from '@/types';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Package, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function InventoryPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unsubStock = InventoryService.subscribe(setStocks);
    const unsubProduct = ProductService.subscribe(setProducts);
    const unsubProject = ProjectService.subscribe(setProjects);
    return () => { unsubStock(); unsubProduct(); unsubProject(); };
  }, []);

  const enrichedStocks = stocks.map(stock => ({
    ...stock,
    product: products.find(p => p.id === stock.productId),
    project: projects.find(p => p.id === stock.projectId)
  })).filter(s => 
    s.product?.name.toLowerCase().includes(search.toLowerCase()) || 
    s.project?.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif italic">Inventory Control</h1>
        <p className="text-slate-500 text-sm">Real-time material tracking across all projects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 border border-slate-200 rounded-sm">
           <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Stock Breakdown</h3>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                 <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                 <p className="text-2xl font-semibold">{enrichedStocks.length}</p>
                 <p className="text-xs text-slate-500 uppercase font-mono">Active SKU-Project Pairs</p>
              </div>
           </div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-sm">
           <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Value on Site</h3>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                 <ArrowUpRight className="w-6 h-6 text-green-600" />
              </div>
              <div>
                 <p className="text-2xl font-semibold">₹{(stocks.length * 12500).toLocaleString()}</p>
                 <p className="text-xs text-slate-500 uppercase font-mono">Estimated Stock Value</p>
              </div>
           </div>
        </div>
        <div className="bg-white p-6 border border-slate-200 rounded-sm">
           <h3 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">Critical Stock</h3>
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center">
                 <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <div>
                 <p className="text-2xl font-semibold">
                   {enrichedStocks.filter(s => s.quantity <= (s.product?.lowStockThreshold || 0)).length}
                 </p>
                 <p className="text-xs text-slate-500 uppercase font-mono">SKUs below threshold</p>
              </div>
           </div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
           <div className="relative w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
              <Input 
                 placeholder="Search project or material..." 
                 className="pl-9 h-9" 
                 value={search}
                 onChange={e => setSearch(e.target.value)}
              />
           </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow className="text-[10px] font-mono uppercase tracking-widest italic bg-slate-50">
              <TableHead>Project</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Quantity</TableHead>
              <TableHead>UOM</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-sm">
            {enrichedStocks.map((stock) => {
              const isLow = stock.quantity <= (stock.product?.lowStockThreshold || 0);
              return (
                <TableRow key={stock.id}>
                  <TableCell className="font-medium">{stock.project?.name || 'Unknown'}</TableCell>
                  <TableCell className="font-semibold text-slate-900">{stock.product?.name || stock.productId}</TableCell>
                  <TableCell className="text-slate-500">{stock.product?.category}</TableCell>
                  <TableCell className={`text-right font-mono font-bold ${isLow ? 'text-red-600' : 'text-slate-900'}`}>
                    {stock.quantity}
                  </TableCell>
                  <TableCell className="text-xs uppercase font-mono text-slate-400">{stock.product?.uom}</TableCell>
                  <TableCell>
                    {isLow ? (
                      <Badge className="bg-red-50 text-red-700 border-red-100 hover:bg-red-50">Low Stock</Badge>
                    ) : (
                      <Badge className="bg-green-50 text-green-700 border-green-100 hover:bg-green-50">In Stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right text-xs text-slate-500 font-mono italic">
                    {new Date(stock.lastUpdated).toLocaleString()}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
