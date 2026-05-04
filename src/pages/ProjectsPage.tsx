import React, { useState, useEffect } from 'react';
import { ProjectService } from '@/services/store';
import { Project } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Plus, Briefcase, MapPin, Search } from 'lucide-react';
import { toast } from 'sonner';
import { Badge } from '@/components/ui/badge';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newProject, setNewProject] = useState<Omit<Project, 'id'>>({
    name: '',
    location: '',
    status: 'ACTIVE',
    budget: 0,
    managerId: '',
    createdAt: new Date().toISOString()
  });

  useEffect(() => {
    return ProjectService.subscribe(setProjects);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await ProjectService.add(newProject);
      setIsAddOpen(false);
      toast.success('Project initiated successfully');
      setNewProject({
        name: '',
        location: '',
        status: 'ACTIVE',
        budget: 0,
        managerId: '',
        createdAt: new Date().toISOString()
      });
    } catch (err) {
      toast.error('Failed to create project');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-serif italic">Project Portfolio</h1>
          <p className="text-slate-500 text-sm">Centralized control for all active construction sites.</p>
        </div>
        
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
          <DialogTrigger render={
            <Button className="bg-orange-600 hover:bg-orange-700 h-10 gap-2">
              <Plus className="w-4 h-4" /> New Project
            </Button>
          } />
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Initiate Project</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAdd} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input id="name" value={newProject.name} onChange={e => setNewProject({...newProject, name: e.target.value})} placeholder="e.g. Skyline Residencies Ph 1" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Site Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input id="location" className="pl-9" value={newProject.location} onChange={e => setNewProject({...newProject, location: e.target.value})} placeholder="City, State" required />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="budget">Estimated Budget</Label>
                  <Input id="budget" type="number" value={newProject.budget} onChange={e => setNewProject({...newProject, budget: Number(e.target.value)})} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                   <Select 
                     value={newProject.status} 
                     onValueChange={(v: any) => setNewProject({...newProject, status: v})}
                   >
                     <SelectTrigger>
                       <SelectValue />
                     </SelectTrigger>
                     <SelectContent>
                       <SelectItem value="ACTIVE">Active</SelectItem>
                       <SelectItem value="ON_HOLD">On Hold</SelectItem>
                       <SelectItem value="COMPLETED">Completed</SelectItem>
                     </SelectContent>
                   </Select>
                </div>
              </div>
              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700">Create Project</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white border border-slate-200 rounded-sm p-6 space-y-4 hover:shadow-md transition-shadow">
             <div className="flex justify-between items-start">
                <div className="w-10 h-10 bg-slate-100 rounded-sm flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-slate-600" />
                </div>
                <Badge className={
                  project.status === 'ACTIVE' ? 'bg-green-50 text-green-700 border-green-100' : 
                  project.status === 'ON_HOLD' ? 'bg-orange-50 text-orange-700 border-orange-100' : 
                  'bg-slate-50 text-slate-700 border-slate-100'
                }>
                  {project.status}
                </Badge>
             </div>
             <div>
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{project.name}</h3>
                <p className="text-xs text-slate-500 font-mono uppercase mt-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {project.location}
                </p>
             </div>
             <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs">
                <span className="text-slate-400 font-mono">ID: #{project.id.slice(-6)}</span>
                <span className="font-bold text-slate-900">₹{project.budget?.toLocaleString()}</span>
             </div>
          </div>
        ))}
        {projects.length === 0 && (
           <div className="col-span-full py-20 text-center border-2 border-dashed border-slate-200 rounded-lg">
             <Briefcase className="w-12 h-12 text-slate-300 mx-auto mb-4" />
             <p className="text-slate-400 font-serif italic">No projects found. Add your first site to begin tracking.</p>
           </div>
        )}
      </div>
    </div>
  );
}
