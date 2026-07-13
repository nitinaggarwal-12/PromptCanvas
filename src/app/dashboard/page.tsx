'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Trash2, 
  Network, 
  ArrowRight, 
  Shield, 
  Users, 
  Layers, 
  Database,
  Search,
  FileText,
  Sparkles,
  BarChart3,
  Loader2
} from 'lucide-react';

interface Diagram {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  versions?: DiagramVersion[];
}

interface DiagramVersion {
  id: string;
  diagram_id: string;
  version_number: number;
  xml_content: string;
  comment: string | null;
  created_by: string;
  created_at: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newDiagramName, setNewDiagramName] = useState('');
  const [newDiagramPrompt, setNewDiagramPrompt] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  const fetchDiagrams = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/diagrams');
      if (!res.ok) throw new Error('Failed to fetch diagrams');
      const data = await res.json();
      setDiagrams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetchDiagrams();
    }, 0);
  }, []);

  const handleDeleteDiagram = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!confirm('Are you sure you want to delete this architecture workspace?')) return;
    
    try {
      const res = await fetch(`/api/diagrams/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete diagram');
      setDiagrams(prev => prev.filter(d => d.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting diagram');
    }
  };

  const handleCreateDiagram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiagramName.trim()) return;
    setIsCreating(true);

    try {
      const defaultXml = `
        <mxfile host="embed.diagrams.net">
          <diagram id="clean_workspace" name="Clean Architecture Workspace">
            <mxGraphModel dx="1193" dy="853" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="1000" pageHeight="950" math="0" shadow="0">
              <root>
                <mxCell id="0" />
                <mxCell id="1" parent="0" />
                <mxCell id="welcome_node" value="&lt;b&gt;[1] New Architecture Workspace&lt;/b&gt;&lt;br&gt;&lt;i&gt;Type a prompt in the AI box below to design your system with Gemini!&lt;/i&gt;" style="rounded=1;whiteSpace=wrap;html=1;fillColor=#DAE8FC;strokeColor=#6C8EBF;strokeWidth=2;fontFamily=Helvetica;fontSize=14;" vertex="1" parent="1">
                  <mxGeometry x="350" y="250" width="300" height="80" as="geometry" />
                </mxCell>
              </root>
            </mxGraphModel>
          </diagram>
        </mxfile>
      `.trim();

      const res = await fetch('/api/diagrams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newDiagramName,
          xml: defaultXml,
          comment: 'Initial canvas created',
          prompt: newDiagramPrompt.trim() || null
        })
      });

      if (!res.ok) throw new Error('Failed to create diagram');
      const newDiagram = await res.json();
      
      setIsCreateModalOpen(false);
      
      // Route immediately to workspace canvas
      router.push(`/workspace?diagram=${newDiagram.diagram.id}`);
    } catch (err) {
      console.error(err);
      alert('Error creating diagram');
    } finally {
      setIsCreating(false);
    }
  };

  // Filter diagrams based on search
  const filteredDiagrams = diagrams.filter(d => 
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen w-screen bg-[#070a13] text-slate-100 flex flex-col overflow-x-hidden font-sans relative">
      {/* Background radial overlays */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] rounded-full bg-teal-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[45vw] h-[45vw] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      {/* Header Bar */}
      <header className="w-full border-b border-panel-border/30 h-16 bg-[#070a13]/70 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-30 shrink-0">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-400 to-indigo-500 p-0.5 shadow-lg shadow-teal-500/20 flex items-center justify-center">
              <div className="w-full h-full bg-[#070a13] rounded-[10px] flex items-center justify-center">
                <Network className="w-4.5 h-4.5 text-teal-accent" />
              </div>
            </div>
            <span className="font-extrabold tracking-wider text-xs text-white uppercase">Maestro Sketch</span>
          </Link>
          <span className="text-[10px] font-bold text-teal-accent uppercase tracking-widest px-2.5 py-0.5 rounded bg-teal-500/10 border border-teal-500/20">
            Premium Portal
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button
            id="new-diagram-btn"
            onClick={() => {
              setNewDiagramName('');
              setNewDiagramPrompt('');
              setIsCreateModalOpen(true);
            }}
            className="px-4 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs transition-all glow-teal-hover flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Workspace</span>
          </button>
        </div>
      </header>

      {/* Main Portal View */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-8 py-10 space-y-10 relative z-10">
        
        {/* Page Title Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Enterprise Operations Portal</h1>
            <p className="text-xs text-slate-400 mt-1">High-level telemetry, security compliance matrices, and active diagram workspaces.</p>
          </div>
          
          {/* Quick Metrics */}
          <div className="flex items-center gap-6 bg-slate-900/40 border border-panel-border/30 rounded-xl px-5 py-3 shadow-md backdrop-blur-sm">
            <div className="text-center">
              <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Compliance Matrix</span>
              <span className="text-sm font-extrabold text-teal-accent flex items-center gap-1 mt-0.5 justify-center">
                <Shield className="w-3.5 h-3.5 text-teal-accent" />
                <span>94.2%</span>
              </span>
            </div>
            <div className="h-8 w-[1px] bg-panel-border/50" />
            <div className="text-center">
              <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Deployments Active</span>
              <span className="text-sm font-extrabold text-white mt-0.5 block">18 Units</span>
            </div>
          </div>
        </div>

        {/* 1. Summary Metrics Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              name: "Active Workspaces",
              value: diagrams.length,
              sub: "Diagram architectures stored",
              icon: Layers,
              color: "text-teal-400 bg-teal-500/10"
            },
            {
              name: "Security Health Index",
              value: "A- Grade",
              sub: "Compliance rating active",
              icon: Shield,
              color: "text-purple-400 bg-purple-500/10"
            },
            {
              name: "Active Team Nodes",
              value: "4 Units",
              sub: "DevOps, SecOps, Core Infrastructure",
              icon: Users,
              color: "text-indigo-400 bg-indigo-500/10"
            },
            {
              name: "Database Storage",
              value: "SQLite Local",
              sub: "Isolated dev.db connected",
              icon: Database,
              color: "text-amber-400 bg-amber-500/10"
            }
          ].map((metric, idx) => (
            <div key={idx} className="glass-panel border-panel-border/30 rounded-xl p-5 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${metric.color}`}>
                <metric.icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">{metric.name}</span>
                <span className="text-xl font-extrabold text-white block">{metric.value}</span>
                <span className="text-[10px] text-slate-400 block">{metric.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 2. Custom Analytical Visual Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart 1: Activity by Team */}
          <div className="glass-panel border-panel-border/30 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-teal-accent" />
                <span>Usecase Allocation Matrix</span>
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Distribution of designs across active business departments.</p>
            </div>
            
            <div className="space-y-3 pt-2">
              {[
                { name: "Enterprise Core Architecture", count: 5, pct: 45, color: "bg-teal-400" },
                { name: "DevOps Build Pipelines", count: 4, pct: 30, color: "bg-indigo-400" },
                { name: "AI RAG & Analytics Core", count: 3, pct: 15, color: "bg-purple-400" },
                { name: "Retail Database Store", count: 2, pct: 10, color: "bg-amber-400" }
              ].map((team, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-slate-300">{team.name}</span>
                    <span className="text-slate-400 font-bold">{team.count} ({team.pct}%)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-bg-dark border border-panel-border/30 overflow-hidden">
                    <div className={`h-full rounded-full ${team.color}`} style={{ width: `${team.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart 2: Security compliance scorecard */}
          <div className="glass-panel border-panel-border/30 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-purple-400" />
                <span>Security Compliance Scorecard</span>
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Average security ratings calculated by Gemini.</p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4 bg-bg-dark/40 border border-panel-border/30 rounded-xl p-4">
                <span className="text-3xl font-extrabold text-teal-accent">A-</span>
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Global Compliance Grade</span>
                  <p className="text-[11px] text-slate-400 mt-0.5">Excellent posture. Minor risks identified in database subnets.</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-[#0b0f19] border border-panel-border/30 rounded-lg p-3">
                  <span className="text-xs font-bold text-emerald-400 block">0</span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider mt-1 block">Critical Risks</span>
                </div>
                <div className="bg-[#0b0f19] border border-panel-border/30 rounded-lg p-3">
                  <span className="text-xs font-bold text-amber-400 block">3</span>
                  <span className="text-[9px] text-slate-500 uppercase tracking-wider mt-1 block">Warnings</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Quick Start Presets Launcher */}
          <div className="glass-panel border-panel-border/30 rounded-xl p-5 space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-teal-accent animate-pulse" />
                <span>Quick Launch Templates</span>
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Select a pre-designed cloud architecture template to build instantly.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              {[
                { name: "GCP Serverless", desc: "Global CDN, Cloud Run, Cloud Storage", color: "border-teal-500/20 hover:border-teal-500/40" },
                { name: "AWS Kubernetes", desc: "ALB, EKS Worker nodes, RDS Postgre", color: "border-amber-500/20 hover:border-amber-500/40" },
                { name: "AI RAG Pipeline", desc: "pgvector DB, Vertex AI, Gemini models", color: "border-purple-500/20 hover:border-purple-500/40" },
                { name: "DevOps CI/CD", desc: "GitHub Actions, Terraform builds", color: "border-indigo-500/20 hover:border-indigo-500/40" }
              ].map((tpl, idx) => (
                <div 
                  key={idx}
                  onClick={() => {
                    setNewDiagramName(tpl.name + " Workspace");
                    setNewDiagramPrompt(`Act as an Architect. Design a ${tpl.name} layout with ${tpl.desc}`);
                    setIsCreateModalOpen(true);
                  }}
                  className={`glass-panel ${tpl.color} rounded-lg p-3 flex flex-col justify-between cursor-pointer hover:scale-[1.02] transition-all`}
                >
                  <span className="font-bold text-[11px] text-white block">{tpl.name}</span>
                  <span className="text-[9px] text-slate-500 block leading-tight mt-1 line-clamp-2">{tpl.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. Workspace Diagrams Manager */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-panel-border/30 pb-3">
            <div>
              <h2 className="text-lg font-bold text-white tracking-tight">Active Architecture Workspaces</h2>
              <p className="text-[10px] text-slate-500 mt-0.5">Review, audit, or delete active enterprise canvas files.</p>
            </div>

            {/* Search Bar */}
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search diagrams by name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b0f19]/80 border border-panel-border/50 focus:border-teal-500/50 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-300 focus:outline-none transition-all placeholder-slate-600"
              />
            </div>
          </div>

          {/* Diagrams List Table */}
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-3 glass-panel border-panel-border/20 rounded-xl">
              <Loader2 className="w-8 h-8 animate-spin text-teal-accent" />
              <span className="text-xs text-slate-500">Loading diagrams database...</span>
            </div>
          ) : filteredDiagrams.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4 glass-panel border-panel-border/20 rounded-xl text-center p-8 bg-panel-dark/10">
              <FileText className="w-12 h-12 text-slate-600" />
              <div>
                <h4 className="font-bold text-sm text-slate-300">No workspaces found</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-sm">Create a new cloud architecture workspace from scratch or launch one of our quick presets.</p>
              </div>
              <button
                id="new-diagram-btn"
                onClick={() => {
                  setNewDiagramName('');
                  setNewDiagramPrompt('');
                  setIsCreateModalOpen(true);
                }}
                className="px-4 py-2 rounded-lg bg-teal-accent/15 hover:bg-teal-accent text-teal-300 hover:text-bg-dark font-bold text-xs transition-all border border-teal-500/20 hover:border-transparent flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Create Diagram</span>
              </button>
            </div>
          ) : (
            <div className="glass-panel border-panel-border/30 rounded-xl overflow-hidden shadow-lg">
              <div className="overflow-x-auto w-full">
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="bg-panel-dark/40 border-b border-panel-border/50 text-slate-500 uppercase tracking-wider font-bold">
                      <th className="px-6 py-4">Workspace Title</th>
                      <th className="px-6 py-4">Vulnerability Score</th>
                      <th className="px-6 py-4">Versions Saved</th>
                      <th className="px-6 py-4">Deployment Platform</th>
                      <th className="px-6 py-4">Last Modified</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-panel-border/30">
                    {filteredDiagrams.map((diagram) => {
                      const verCount = diagram.versions?.length || 1;
                      const hasGcp = diagram.name.toLowerCase().includes('gcp') || diagram.name.toLowerCase().includes('serverless');
                      const hasAws = diagram.name.toLowerCase().includes('aws') || diagram.name.toLowerCase().includes('kubernetes');
                      const platform = hasGcp ? 'GCP' : hasAws ? 'AWS' : 'Hybrid/Multi-Cloud';
                      
                      return (
                        <tr 
                          key={diagram.id}
                          onClick={() => router.push(`/workspace?diagram=${diagram.id}`)}
                          className="hover:bg-slate-900/30 transition-all cursor-pointer group"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded bg-teal-500/10 flex items-center justify-center text-teal-accent">
                                <Network className="w-4 h-4" />
                              </div>
                              <div>
                                <span className="font-bold text-white group-hover:text-teal-accent transition-colors block text-sm">{diagram.name}</span>
                                <span className="text-[10px] text-slate-500 block truncate max-w-xs">{diagram.id}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              <Shield className="w-3 h-3" />
                              <span>Secured</span>
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-300 font-semibold">{verCount} version{verCount > 1 ? 's' : ''}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold border ${
                              platform === 'GCP' ? 'bg-teal-500/10 text-teal-400 border-teal-500/20' :
                              platform === 'AWS' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                              'bg-purple-500/10 text-purple-400 border-purple-500/20'
                            }`}>
                              {platform}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-400 font-medium">
                            {new Date(diagram.updated_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} at {new Date(diagram.updated_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </td>
                          <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => router.push(`/workspace?diagram=${diagram.id}`)}
                                className="px-2.5 py-1.5 rounded hover:bg-teal-accent hover:text-bg-dark text-slate-300 text-[10px] font-bold transition-all border border-slate-700 hover:border-transparent flex items-center gap-1 cursor-pointer"
                              >
                                <span>Launch Canvas</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => handleDeleteDiagram(diagram.id, e)}
                                className="p-1.5 rounded hover:bg-rose-500/20 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                                title="Delete Diagram Workspace"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-panel-border/30 bg-[#070a13] py-8 mt-12">
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-slate-600" />
            <span className="font-bold text-slate-400">MAESTRO SKETCH</span>
          </div>
          <span>&copy; {new Date().getFullYear()} Google DeepMind Team. All rights reserved.</span>
        </div>
      </footer>

      {/* CREATE WORKSPACE MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-panel border-panel-border rounded-xl p-6 w-full max-w-md shadow-2xl relative">
            <h3 className="font-extrabold text-lg text-white mb-2 flex items-center gap-2">
              <Plus className="w-5 h-5 text-teal-accent" />
              <span>Create Diagram Workspace</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6">Initialize a clean architecture design canvas with your custom name and prompts.</p>
            
            <form onSubmit={handleCreateDiagram} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Workspace Name</label>
                <input
                  type="text"
                  placeholder="e.g., Google Cloud E-Commerce"
                  value={newDiagramName}
                  onChange={(e) => setNewDiagramName(e.target.value)}
                  required
                  className="w-full bg-[#0b0f19] border border-panel-border/80 focus:border-teal-500/50 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none transition-all placeholder-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">Initial AI Prompt (Optional)</label>
                <textarea
                  placeholder="e.g., Act as a Solutions Architect. Design a serverless backend using Cloud Run..."
                  value={newDiagramPrompt}
                  onChange={(e) => setNewDiagramPrompt(e.target.value)}
                  className="w-full h-24 bg-[#0b0f19] border border-panel-border/80 focus:border-teal-500/50 rounded-lg px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none transition-all placeholder-slate-600 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-4 border-t border-panel-border/30 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-bold text-xs transition-all glow-teal-hover flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isCreating && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{isCreating ? 'Creating...' : 'Create Canvas'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
