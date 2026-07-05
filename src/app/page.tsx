'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Trash2, 
  Send, 
  RotateCcw, 
  Eye, 
  Edit3, 
  ExternalLink, 
  History, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  MessageSquare, 
  X,
  Loader2,
  FileText
} from 'lucide-react';
import DiagramViewer from '@/components/DiagramViewer';

// Define Types (matching our DB schema + API responses)
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

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  versionNumber?: number;
}

export default function Dashboard() {
  // --- State ---
  const [diagrams, setDiagrams] = useState<Diagram[]>([]);
  const [activeDiagram, setActiveDiagram] = useState<Diagram | null>(null);
  const [activeVersion, setActiveVersion] = useState<DiagramVersion | null>(null);
  const [previewVersion, setPreviewVersion] = useState<DiagramVersion | null>(null);
  
  // UI Panels
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  
  // Modals
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [isInlineEditorOpen, setIsInlineEditorOpen] = useState(false);
  
  // Form Inputs
  const [newDiagramName, setNewDiagramName] = useState('');
  const [promptInput, setPromptInput] = useState('');
  const [saveComment, setSaveComment] = useState('');
  
  // Loading States
  const [isLoadingDiagrams, setIsLoadingDiagrams] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  // Chat History
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  

  
  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const childWindowRef = useRef<Window | null>(null);
  const activeXmlRef = useRef('');
  
  // State for editor integration
  const [pendingXml, setPendingXml] = useState<string | null>(null);

  // Sync active version XML to ref
  useEffect(() => {
    if (activeVersion) {
      activeXmlRef.current = activeVersion.xml_content;
    }
  }, [activeVersion]);

  // Listen for messages from Draw.io editors (both iframe and popup tab)
  useEffect(() => {
    const handleWindowMessage = (evt: MessageEvent) => {
      const iframe = iframeRef.current;
      const childWindow = childWindowRef.current;
      
      const isFromIframe = iframe && evt.source === iframe.contentWindow;
      const isFromChild = childWindow && evt.source === childWindow;
      
      if (!isFromIframe && !isFromChild) return;
      
      let msg: any = {};
      try {
        msg = JSON.parse(evt.data);
      } catch (e) {
        return; // Not JSON
      }
      
      const sourceWindow = isFromIframe ? iframe.contentWindow : childWindow;
      
      if (msg.event === 'init') {
        console.log('[Draw.io Embed] ✉️ Received: init. Sending: load...');
        sourceWindow?.postMessage(JSON.stringify({
          action: 'load',
          xml: activeXmlRef.current
        }), '*');
      }
      
      if (msg.event === 'save') {
        console.log('[Draw.io Embed] ✉️ Received: save. Opening Save Version modal...');
        if (msg.xml) {
          setPendingXml(msg.xml);
          setIsSaveModalOpen(true);
        }
      }
      
      if (msg.event === 'export') {
        console.log('[Draw.io Embed] ✉️ Received: export. Opening Save Version modal...');
        const xmlContent = msg.data || msg.xml;
        if (xmlContent) {
          setPendingXml(xmlContent);
          setIsSaveModalOpen(true);
        }
      }
      
      if (msg.event === 'exit') {
        console.log('[Draw.io Embed] ✉️ Received: exit. Closing editor...');
        if (isFromIframe) {
          setIsInlineEditorOpen(false);
        } else if (isFromChild) {
          childWindow?.close();
          childWindowRef.current = null;
        }
      }
    };
    
    window.addEventListener('message', handleWindowMessage);
    return () => {
      window.removeEventListener('message', handleWindowMessage);
    };
  }, []);

  const openInNewTab = () => {
    if (!activeDiagram || !activeVersion) return;
    
    if (childWindowRef.current && !childWindowRef.current.closed) {
      childWindowRef.current.focus();
      return;
    }
    
    const child = window.open(
      'https://embed.diagrams.net/?embed=1&proto=json&ui=dark',
      '_blank'
    );
    
    childWindowRef.current = child;
  };

  // --- Effects ---
  // Fetch all diagrams on mount
  useEffect(() => {
    fetchDiagrams();
  }, []);

  // Fetch active diagram details when ID changes
  const loadDiagramDetails = async (id: string) => {
    try {
      const res = await fetch(`/api/diagrams/${id}`);
      if (!res.ok) throw new Error('Failed to fetch diagram details');
      const data: Diagram = await res.json();
      
      setActiveDiagram(data);
      
      // Set the latest version as active
      if (data.versions && data.versions.length > 0) {
        const sortedVersions = [...data.versions].sort((a, b) => b.version_number - a.version_number);
        setActiveVersion(sortedVersions[0]);
        setPreviewVersion(null); // Clear preview
        
        // Reconstruct chat history from version comments
        const messages: ChatMessage[] = data.versions
          .sort((a, b) => a.version_number - b.version_number)
          .map((v) => ({
            id: v.id,
            sender: v.created_by.toLowerCase() === 'ai' ? 'ai' : 'user',
            text: v.created_by.toLowerCase() === 'ai' 
              ? `Generated diagram version v${v.version_number}: "${v.comment || 'AI Generated'}"`
              : `Manually edited diagram: "${v.comment || 'Saved changes'}"`,
            timestamp: new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            versionNumber: v.version_number
          }));
        setChatMessages(messages);
      } else {
        setActiveVersion(null);
        setPreviewVersion(null);
        setChatMessages([]);
      }
    } catch (err) {
      console.error(err);
      alert('Error loading diagram details');
    }
  };

  // Scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isGenerating]);

  // --- API Handlers ---
  const fetchDiagrams = async () => {
    setIsLoadingDiagrams(true);
    try {
      const res = await fetch('/api/diagrams');
      if (!res.ok) throw new Error('Failed to fetch diagrams');
      const data = await res.json();
      setDiagrams(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingDiagrams(false);
    }
  };

  const handleCreateDiagram = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDiagramName.trim()) return;
    
    try {
      // Create diagram with a default mock XML
      const defaultXml = `
        <mxfile host="embed.diagrams.net">
          <diagram id="page1" name="Page-1">
            <mxGraphModel dx="1000" dy="1000" grid="1" gridSize="10" guides="1" tooltips="1" connect="1" arrows="1" fold="1" page="1" pageScale="1" pageWidth="827" pageHeight="1169">
              <root>
                <mxCell id="0" />
                <mxCell id="1" parent="0" />
                <mxCell id="node_init" value="New Architecture" style="rounded=1;whiteSpace=wrap;html=1;arcSize=10;fillColor=#DAE8FC;strokeColor=#6C8EBF;fontColor=#000000;strokeWidth=2;" vertex="1" parent="1">
                  <mxGeometry x="340" y="240" width="150" height="60" as="geometry" />
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
          comment: 'Initial canvas created'
        })
      });
      
      if (!res.ok) throw new Error('Failed to create diagram');
      const data = await res.json();
      
      setNewDiagramName('');
      setIsCreateModalOpen(false);
      
      // Refresh list and select the new diagram
      await fetchDiagrams();
      await loadDiagramDetails(data.diagram.id);
    } catch (err) {
      console.error(err);
      alert('Error creating diagram');
    }
  };

  const handleDeleteDiagram = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent selecting the diagram
    if (!confirm('Are you sure you want to delete this diagram and all its version history?')) return;
    
    try {
      const res = await fetch(`/api/diagrams/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete diagram');
      
      if (activeDiagram?.id === id) {
        setActiveDiagram(null);
        setActiveVersion(null);
        setPreviewVersion(null);
        setChatMessages([]);
      }
      
      fetchDiagrams();
    } catch (err) {
      console.error(err);
      alert('Error deleting diagram');
    }
  };

  // Mock AI Generation Loop (Phase 2 Mock, to be replaced by Gemini in Phase 5)
  const handleSendPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim() || !activeDiagram) return;
    
    const userPrompt = promptInput.trim();
    setPromptInput('');
    
    // Add user message to chat
    const userMessage: ChatMessage = {
      id: Math.random().toString(),
      sender: 'user',
      text: userPrompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, userMessage]);
    
    setIsGenerating(true);
    
    try {
      // Call the AI generate API (refinement mode)
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userPrompt,
          diagramId: activeDiagram.id
        })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || errorData.details || 'Failed to generate diagram refinement');
      }
      
      // Reload diagram details to get the new version and update the chat/timeline
      await loadDiagramDetails(activeDiagram.id);
    } catch (err: any) {
      console.error('AI generation error:', err);
      // Add an error message from the AI to the chat
      const errorMessage: ChatMessage = {
        id: Math.random().toString(),
        sender: 'ai',
        text: `❌ Error: ${err.message || 'An unexpected error occurred during diagram generation.'}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Version Handler (for manual edits)
  const handleSaveVersion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeDiagram || !saveComment.trim()) return;
    
    const xmlToSave = pendingXml !== null ? pendingXml : activeVersion?.xml_content;
    if (!xmlToSave) return;
    
    setIsSaving(true);
    try {
      const res = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xmlContent: xmlToSave,
          comment: saveComment,
          createdBy: 'User'
        }
      )});
      
      if (!res.ok) throw new Error('Failed to save version');
      
      setSaveComment('');
      setPendingXml(null);
      setIsSaveModalOpen(false);
      
      // If inline editor was open, close it
      if (isInlineEditorOpen) {
        setIsInlineEditorOpen(false);
      }
      
      // Reload details
      await loadDiagramDetails(activeDiagram.id);
    } catch (err) {
      console.error(err);
      alert('Failed to save version');
    } finally {
      setIsSaving(false);
    }
  };

  // Restore a past version
  const handleRestoreVersion = async (version: DiagramVersion) => {
    if (!activeDiagram) return;
    if (!confirm(`Are you sure you want to restore version v${version.version_number} as the active working draft? This will create a new version v${(activeDiagram.versions?.length || 0) + 1}.`)) return;
    
    try {
      const res = await fetch(`/api/diagrams/${activeDiagram.id}/versions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          xmlContent: version.xml_content,
          comment: `Restored version v${version.version_number}`,
          createdBy: 'User'
        })
      });
      
      if (!res.ok) throw new Error('Failed to restore version');
      
      // Reload details
      await loadDiagramDetails(activeDiagram.id);
    } catch (err) {
      console.error(err);
      alert('Failed to restore version');
    }
  };

  // --- UI Helpers ---
  const displayedVersion = previewVersion || activeVersion;

  return (
    <div className="flex h-screen w-screen bg-bg-dark text-slate-100 overflow-hidden font-sans">
      
      {/* 1. SIDEBAR: Diagram List */}
      <aside 
        className={`glass-panel border-r border-panel-border flex flex-col transition-all duration-300 z-20 ${
          isSidebarOpen ? 'w-64' : 'w-0 -translate-x-full md:w-16 md:translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-panel-border">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-accent" />
              <span className="font-bold text-lg tracking-wider bg-gradient-to-r from-teal-accent to-cyan-400 bg-clip-text text-transparent">
                MAESTRO
              </span>
            </div>
          ) : (
            <Sparkles className="w-5 h-5 text-teal-accent mx-auto" />
          )}
          {isSidebarOpen && (
            <button 
              id="collapse-sidebar-btn"
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* New Diagram Button */}
        <div className="p-3">
          <button
            id="new-diagram-btn"
            onClick={() => setIsCreateModalOpen(true)}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-semibold transition-all glow-teal-hover ${
              !isSidebarOpen && 'p-2'
            }`}
          >
            <Plus className="w-5 h-5" />
            {isSidebarOpen && <span>New Diagram</span>}
          </button>
        </div>

        {/* Diagram List */}
        <div className="flex-1 overflow-y-auto px-2 space-y-1">
          {isLoadingDiagrams ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-teal-accent" />
            </div>
          ) : diagrams.length === 0 ? (
            isSidebarOpen && (
              <p className="text-xs text-slate-500 text-center py-8">No diagrams yet. Create one!</p>
            )
          ) : (
            diagrams.map((d) => (
              <div
                key={d.id}
                onClick={() => loadDiagramDetails(d.id)}
                className={`group flex items-center justify-between p-2.5 rounded-lg cursor-pointer transition-all ${
                  activeDiagram?.id === d.id 
                    ? 'bg-teal-glow text-teal-accent border border-teal-accent/30' 
                    : 'hover:bg-slate-hover text-slate-300 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  <FileText className={`w-4 h-4 shrink-0 ${activeDiagram?.id === d.id ? 'text-teal-accent' : 'text-slate-400'}`} />
                  {isSidebarOpen && (
                    <span className="text-sm font-medium truncate">{d.name}</span>
                  )}
                </div>
                {isSidebarOpen && (
                  <button
                    onClick={(e) => handleDeleteDiagram(d.id, e)}
                    className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))
          )}
        </div>
        
        {/* Toggle Expand Sidebar */}
        {!isSidebarOpen && (
          <div className="p-3 border-t border-panel-border flex justify-center">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 rounded hover:bg-slate-hover text-slate-400 hover:text-white"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </aside>

      {/* 2. MAIN WORKSPACE: Split Pane */}
      <main className="flex-1 flex flex-col min-w-0 h-full">
        
        {/* Top Navbar */}
        <header className="h-16 border-b border-panel-border flex items-center justify-between px-6 bg-panel-dark/50 backdrop-blur">
          <div className="flex items-center gap-4">
            {/* Sidebar toggle if collapsed */}
            {!isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-1 rounded hover:bg-slate-hover text-slate-400"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="font-semibold text-base text-white">
                {activeDiagram ? activeDiagram.name : 'Select or Create a Diagram'}
              </h2>
              {activeDiagram && activeVersion && (
                <p className="text-xs text-slate-400">
                  {previewVersion ? (
                    <span className="text-amber-400 font-medium">Previewing v{previewVersion.version_number} (Read Only)</span>
                  ) : (
                    <span>Active: v{activeVersion?.version_number}</span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Quick Actions (only if diagram active) */}
          {activeDiagram && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsInlineEditorOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-panel-border hover:bg-slate-hover text-xs font-medium transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Inline</span>
              </button>
              <button
                onClick={openInNewTab}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-panel-border hover:bg-slate-hover text-xs font-medium transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in New Tab</span>
              </button>
            </div>
          )}
        </header>

        {/* Workspace Body: Split Pane */}
        <div className="flex-1 flex min-h-0 relative">
          
          {/* A. LEFT PANE: Chat & Prompt Panel */}
          <section className="w-80 border-r border-panel-border flex flex-col bg-panel-dark/30 h-full shrink-0">
            {/* Panel Title */}
            <div className="p-3 border-b border-panel-border flex items-center gap-2 bg-panel-dark/20">
              <MessageSquare className="w-4 h-4 text-teal-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">AI Architect Assistant</span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!activeDiagram ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Sparkles className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-sm text-slate-500">Select a diagram from the sidebar to start designing with AI.</p>
                </div>
              ) : chatMessages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <MessageSquare className="w-8 h-8 text-slate-600 mb-2" />
                  <p className="text-sm text-slate-500">Ask the AI to generate your first architecture diagram!</p>
                </div>
              ) : (
                chatMessages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`flex flex-col max-w-[85%] ${
                      msg.sender === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'
                    }`}
                  >
                    <div className={`p-3 rounded-lg text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-teal-accent text-bg-dark font-medium rounded-tr-none'
                        : 'bg-slate-hover text-slate-100 rounded-tl-none border border-panel-border'
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">
                      {msg.timestamp} {msg.versionNumber && `• v${msg.versionNumber}`}
                    </span>
                  </div>
                ))
              )}
              {isGenerating && (
                <div className="flex items-center gap-2 mr-auto bg-slate-hover/50 border border-panel-border p-3 rounded-lg rounded-tl-none max-w-[85%]">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-accent" />
                  <span className="text-xs text-slate-400 animate-pulse">Maestro-Graph is sketching...</span>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Prompt Input Form */}
            <div className="p-3 border-t border-panel-border bg-panel-dark/40">
              <form onSubmit={handleSendPrompt} className="relative">
                <textarea
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  placeholder={activeDiagram ? "e.g., Add an Apigee Gateway in front of Cloud Run..." : "Select a diagram first..."}
                  disabled={!activeDiagram || isGenerating}
                  rows={2}
                  className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded-lg pl-3 pr-10 py-2.5 text-xs text-slate-100 placeholder-slate-500 focus:outline-none resize-none transition-all disabled:opacity-50"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendPrompt(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={!activeDiagram || isGenerating || !promptInput.trim()}
                  className="absolute right-2.5 bottom-3.5 p-1.5 rounded-md bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 transition-all cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
              <p className="text-[10px] text-slate-500 mt-1.5 text-center">
                Press Enter to send. Gemini 2.0 Flash will refine your active diagram.
              </p>
            </div>
          </section>

          {/* B. CENTER PANE: Diagram Viewport */}
          <section className="flex-1 flex flex-col bg-bg-dark h-full relative overflow-hidden">
            
            {/* Large Viewport Canvas */}
            <div className="flex-1 w-full h-full flex items-center justify-center p-8 relative overflow-auto">
              
              {/* Dark Grid Background */}
              <div 
                className="absolute inset-0 opacity-2"
                style={{
                  backgroundImage: `
                    linear-gradient(to right, rgba(20, 184, 166, 0.05) 1px, transparent 1px),
                    linear-gradient(to bottom, rgba(20, 184, 166, 0.05) 1px, transparent 1px)
                  `,
                  backgroundSize: '20px 20px'
                }}
              />

              {!activeDiagram ? (
                <div className="text-center z-10 max-w-md p-6 glass-panel rounded-2xl border-dashed border-panel-border">
                  <Sparkles className="w-12 h-12 text-teal-accent mx-auto mb-4 animate-pulse" />
                  <h3 className="text-lg font-semibold text-white mb-2">Create Your First Diagram</h3>
                  <p className="text-sm text-slate-400 mb-6">
                    Maestro Sketch translates natural language prompts into professional Draw.io architecture diagrams.
                  </p>
                  <button
                    onClick={() => setIsCreateModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-semibold transition-all glow-teal-hover"
                  >
                    Get Started
                  </button>
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center relative z-10">
                  <DiagramViewer xml={displayedVersion?.xml_content || ''} />
                </div>
              )}
            </div>
            
            {/* Reset preview banner if active */}
            {previewVersion && (
              <div className="bg-amber-500/15 border-t border-amber-500/30 px-4 py-2 flex items-center justify-between text-xs text-amber-300 z-10 animate-fade-in">
                <span>You are previewing a historical snapshot (v{previewVersion.version_number}).</span>
                <button 
                  onClick={() => setPreviewVersion(null)}
                  className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-600 text-bg-dark font-semibold transition-all cursor-pointer"
                >
                  Back to Active Draft
                </button>
              </div>
            )}
          </section>

          {/* C. RIGHT PANE: Version History Timeline */}
          <section 
            className={`glass-panel border-l border-panel-border flex flex-col transition-all duration-300 z-20 ${
              isHistoryOpen ? 'w-80' : 'w-0 translate-x-full md:w-16 md:translate-x-0'
            }`}
          >
            {/* Header */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-panel-border bg-panel-dark/20">
              {isHistoryOpen && (
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-teal-accent" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">Version History</span>
                </div>
              )}
              {isHistoryOpen ? (
                <button 
                  onClick={() => setIsHistoryOpen(false)}
                  className="p-1 rounded hover:bg-slate-hover text-slate-400"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button 
                  onClick={() => setIsHistoryOpen(true)}
                  className="p-1.5 rounded hover:bg-slate-hover text-slate-400 mx-auto"
                >
                  <History className="w-4 h-4 text-teal-accent" />
                </button>
              )}
            </div>

            {/* Timeline List */}
            {isHistoryOpen && (
              <div className="flex-1 overflow-y-auto p-4 space-y-4 relative">
                {/* Vertical line connector */}
                <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-slate-800" />

                {!activeDiagram || !activeDiagram.versions || activeDiagram.versions.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-8 relative z-10">No versions saved yet.</p>
                ) : (
                  activeDiagram.versions
                    .sort((a, b) => b.version_number - a.version_number)
                    .map((v) => {
                      const isActive = activeVersion?.id === v.id;
                      const isPreviewing = previewVersion?.id === v.id;
                      const isAi = v.created_by.toLowerCase() === 'ai';
                      
                      return (
                        <div key={v.id} className="flex gap-4 relative z-10 group">
                          {/* Timeline dot */}
                          <div className={`w-5 h-5 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold border-2 ${
                            isPreviewing
                              ? 'bg-amber-500 border-amber-400 text-bg-dark'
                              : isActive && !previewVersion
                              ? 'bg-teal-accent border-teal-400 text-bg-dark'
                              : 'bg-bg-dark border-slate-700 text-slate-400 group-hover:border-teal-accent/50'
                          }`}>
                            {v.version_number}
                          </div>

                          {/* Version Card */}
                          <div className={`flex-1 p-3 rounded-lg border transition-all ${
                            isPreviewing
                              ? 'bg-amber-500/5 border-amber-500/40'
                              : isActive && !previewVersion
                              ? 'bg-teal-glow border-teal-accent/30'
                              : 'bg-panel-dark/40 border-panel-border hover:border-slate-700'
                          }`}>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${
                                isAi ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                              }`}>
                                {isAi ? 'Gemini AI' : 'User'}
                              </span>
                              <span className="text-[9px] text-slate-500">
                                {new Date(v.created_at).toLocaleDateString([], { month: 'short', day: 'numeric' })} at {new Date(v.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            
                            <p className="text-xs text-slate-300 leading-normal mb-2">
                              {v.comment || 'No description provided.'}
                            </p>

                            <div className="flex items-center gap-1.5 border-t border-panel-border/40 pt-2 mt-2">
                              <button
                                onClick={() => setPreviewVersion(v)}
                                disabled={isPreviewing}
                                className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium transition-all cursor-pointer ${
                                  isPreviewing
                                    ? 'bg-amber-500 text-bg-dark'
                                    : 'hover:bg-slate-hover text-slate-400 hover:text-white'
                                }`}
                              >
                                <Eye className="w-3 h-3" />
                                <span>{isPreviewing ? 'Previewing' : 'Preview'}</span>
                              </button>
                              
                              {!isActive && (
                                <button
                                  onClick={() => handleRestoreVersion(v)}
                                  className="flex items-center gap-1 px-2 py-1 rounded text-[10px] font-medium hover:bg-slate-hover text-slate-400 hover:text-teal-accent transition-all cursor-pointer"
                                >
                                  <RotateCcw className="w-3 h-3" />
                                  <span>Restore</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                )}
              </div>
            )}
          </section>
        </div>
      </main>

      {/* --- MODALS --- */}

      {/* 1. Create Diagram Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-panel border-panel-border rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">Create New Diagram</h3>
              <button 
                onClick={() => setIsCreateModalOpen(false)}
                className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateDiagram} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">Diagram Name</label>
                <input
                  type="text"
                  required
                  value={newDiagramName}
                  onChange={(e) => setNewDiagramName(e.target.value)}
                  placeholder="e.g., Google Cloud E-Commerce"
                  className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-teal-accent hover:bg-teal-hover text-bg-dark font-semibold transition-all glow-teal-hover"
              >
                Create Canvas
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Save Version Modal (Mock) */}
      {isSaveModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <div className="glass-panel border-panel-border rounded-xl p-6 w-full max-w-sm shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg text-white">Save New Version</h3>
              <button 
                onClick={() => setIsSaveModalOpen(false)}
                className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSaveVersion} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5">What changes did you make?</label>
                <textarea
                  required
                  value={saveComment}
                  onChange={(e) => setSaveComment(e.target.value)}
                  placeholder="e.g., Connected Apigee Gateway to Cloud Run"
                  rows={3}
                  className="w-full bg-bg-dark border border-panel-border focus:border-teal-accent rounded-lg px-3.5 py-2 text-sm text-slate-100 placeholder-slate-600 focus:outline-none resize-none transition-all"
                  autoFocus
                />
              </div>
              <button
                type="submit"
                disabled={isSaving}
                className="w-full py-2 rounded-lg bg-teal-accent hover:bg-teal-hover disabled:bg-slate-800 text-bg-dark disabled:text-slate-600 font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
                <span>{isSaving ? 'Saving...' : 'Save Version'}</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Inline Editor Modal (Iframe Shell for Phase 2) */}
      {isInlineEditorOpen && activeDiagram && activeVersion && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex flex-col z-50 animate-fade-in">
          {/* Editor Header */}
          <header className="h-14 border-b border-panel-border flex items-center justify-between px-6 bg-panel-dark/95">
            <div className="flex items-center gap-3">
              <Edit3 className="w-4 h-4 text-teal-accent" />
              <h3 className="font-bold text-sm text-white">Inline Editor: {activeDiagram.name}</h3>
            </div>
            <div className="flex items-center gap-3">
              <button
                id="inline-save-exit-btn"
                onClick={() => {
                  console.log('[Dashboard] 🚀 "Save & Exit" button clicked! Sending export action to iframe...');
                  const msg = { action: 'export', format: 'xml' };
                  // Send both stringified and raw object for maximum compatibility with proto=json
                  iframeRef.current?.contentWindow?.postMessage(JSON.stringify(msg), '*');
                  iframeRef.current?.contentWindow?.postMessage(msg, '*');
                }}
                className="px-3.5 py-1.5 rounded-md bg-teal-accent hover:bg-teal-hover text-bg-dark text-xs font-bold transition-all cursor-pointer"
              >
                Save & Exit
              </button>
              <button
                onClick={() => {
                  console.log('[Dashboard] 🚀 Close button clicked!');
                  if (confirm('Are you sure you want to exit? Any unsaved changes will be lost.')) {
                    setIsInlineEditorOpen(false);
                  }
                }}
                className="p-1 rounded hover:bg-slate-hover text-slate-400 hover:text-white transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </header>

          {/* Editor Iframe Area */}
          <div className="flex-1 bg-bg-dark relative">
            <iframe
              ref={iframeRef}
              src="https://embed.diagrams.net/?embed=1&ui=dark&spin=1&proto=json"
              className="w-full h-full border-0 bg-transparent"
            />
          </div>
        </div>
      )}

    </div>
  );
}
