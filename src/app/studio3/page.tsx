'use client';

import { FormEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, History, LoaderCircle, Moon, Music2, Plus, Sparkles, Sun } from 'lucide-react';
import { MediaStage, Studio3MediaAsset } from '@/components/studio3/MediaStage';
import { MultimodalModeSelector } from '@/components/studio3/MultimodalModeSelector';
import { MultimodalMode } from '@/lib/studio3/multimodalCatalog';

type Theme = 'light' | 'dark';

function mapAsset(asset: Record<string, unknown>): Studio3MediaAsset {
  return {
    id: String(asset.id),
    type: String(asset.type || asset.asset_type || 'interactive_html'),
    title: String(asset.title || 'Untitled content'),
    url: typeof asset.url === 'string' ? asset.url : null,
    htmlCode: typeof asset.htmlCode === 'string' ? asset.htmlCode : typeof asset.html_code === 'string' ? asset.html_code : null,
    aspectRatio: typeof asset.aspectRatio === 'string' ? asset.aspectRatio : typeof asset.aspect_ratio === 'string' ? asset.aspect_ratio : '16:9',
    caption: typeof asset.caption === 'string' ? asset.caption : null,
    category: typeof asset.category === 'string' ? asset.category : 'general',
    createdAt: typeof asset.createdAt === 'string' ? asset.createdAt : typeof asset.created_at === 'string' ? asset.created_at : undefined
  };
}

export default function Studio3Page() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [assets, setAssets] = useState<Studio3MediaAsset[]>([]);
  const [activeAssetIndex, setActiveAssetIndex] = useState(0);
  const [prompt, setPrompt] = useState('');
  const [selectedMode, setSelectedMode] = useState<MultimodalMode | null>(null);
  const [isModeSelectorOpen, setIsModeSelectorOpen] = useState(false);
  const [loadingAssets, setLoadingAssets] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [musicGenre, setMusicGenre] = useState('Lo-fi');
  const [musicMood, setMusicMood] = useState('Focused');
  const [musicFormat, setMusicFormat] = useState('Instrumental');
  const [voiceStyle, setVoiceStyle] = useState('Warm narrator');
  const [voicePace, setVoicePace] = useState('Natural pace');
  const [visualStyle, setVisualStyle] = useState('Cinematic');
  const [visualPalette, setVisualPalette] = useState('Vibrant');

  useEffect(() => { void loadAssets(); }, []);

  async function loadAssets() {
    setLoadingAssets(true);
    try {
      const response = await fetch('/api/studio3/media');
      const data = await response.json();
      if (!response.ok || !data.success) throw new Error(data.error || 'Unable to load saved content.');
      setAssets(Array.isArray(data.assets) ? data.assets.map(mapAsset) : []);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Unable to load saved content.');
    } finally { setLoadingAssets(false); }
  }

  async function generateContent(rawPrompt: string, mode: MultimodalMode | null = selectedMode, previousAsset?: Studio3MediaAsset | null) {
    const finalPrompt = rawPrompt.trim();
    if (!finalPrompt || generating) return false;
    setGenerating(true); setError(null); setNotice(null);
    try {
      const response = await fetch('/api/studio3/media', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: mode ? `${mode.promptScaffold}${finalPrompt}` : finalPrompt,
          type: mode?.outputType || previousAsset?.type || 'interactive_html',
          category: mode?.category || previousAsset?.category || 'general',
          previousAsset: previousAsset || null
        })
      });
      const data = await response.json();
      if (!response.ok || !data.success || !data.asset) throw new Error(data.error || 'Content generation failed.');
      const asset = mapAsset(data.asset);
      setAssets(previous => [asset, ...previous.filter(item => item.id !== asset.id)]);
      setActiveAssetIndex(0); setPrompt(''); setNotice(previousAsset ? `Created an updated version of ${previousAsset.title}.` : `Created ${asset.title}.`);
      return true;
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Content generation failed.');
      return false;
    } finally { setGenerating(false); }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const direction = selectedMode?.id === 'audio_song'
      ? `${prompt}. Create a ${musicFormat.toLowerCase()} ${musicGenre.toLowerCase()} track with a ${musicMood.toLowerCase()} mood.`
      : selectedMode?.category === 'audio'
        ? `${prompt}. Voice: ${voiceStyle}; delivery: ${voicePace}.`
        : ['visuals', 'video', 'motion'].includes(selectedMode?.category || '')
          ? `${prompt}. Visual style: ${visualStyle}; color treatment: ${visualPalette}.`
          : prompt;
    void generateContent(direction);
  }
  function selectMode(mode: MultimodalMode, samplePrompt: string, autoGenerate = false) {
    setSelectedMode(mode); setPrompt(samplePrompt); setIsModeSelectorOpen(false);
    if (autoGenerate) void generateContent(samplePrompt, mode);
  }

  const activeAsset = assets[activeAssetIndex] || null;

  return (
    <div className={theme === 'dark' ? 'min-h-screen bg-[#070b16] text-slate-100' : 'min-h-screen bg-slate-50 text-slate-900'}>
      <header className={`sticky top-0 z-30 w-full border-b backdrop-blur ${theme === 'dark' ? 'border-slate-800 bg-[#070b16]/90' : 'border-slate-200 bg-white/90'}`}>
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-4 md:px-12">
          <Link href="/dashboard" className="flex items-center gap-3" aria-label="PromptCanvas Studio 3 home"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-gradient-to-br from-fuchsia-500 via-violet-600 to-indigo-600 text-sm font-black tracking-tight text-white shadow-lg shadow-fuchsia-500/30">PC</div><div><p className="text-base font-black tracking-tight">PromptCanvas Studio 3</p><p className="text-xs font-medium text-slate-400">Pure multimodal content generation</p></div></Link>
          <div className="flex items-center gap-2"><button onClick={() => setIsModeSelectorOpen(true)} className="hidden items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-purple-500 sm:flex"><Plus className="h-4 w-4" />Choose format</button><button onClick={() => setTheme(current => current === 'dark' ? 'light' : 'dark')} className={`rounded-xl border p-2 transition ${theme === 'dark' ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-300 hover:bg-slate-100'}`} aria-label="Toggle color theme">{theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}</button></div>
        </div>
      </header>
      <main className="mx-auto max-w-[1600px] px-6 py-10 md:px-12 md:py-14">
        <section className="mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300"><Sparkles className="h-3.5 w-3.5" />Content-first studio</span>
          <h1 className="mt-5 text-4xl font-black tracking-tight md:text-6xl">Create experiences, not XML.</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">Generate interactive learning content, decks, simulations, quizzes, prototypes, timelines, and creative web experiences. Every item below is saved content—not a seeded demo.</p>
          <form onSubmit={submit} className={`mx-auto mt-8 flex max-w-3xl gap-2 rounded-2xl border p-2 shadow-xl ${theme === 'dark' ? 'border-slate-700 bg-slate-900' : 'border-slate-200 bg-white'}`}><input value={prompt} onChange={event => setPrompt(event.target.value)} placeholder={selectedMode ? `Create a ${selectedMode.name.toLowerCase()}…` : 'Describe what you want to create…'} className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm outline-none placeholder:text-slate-500" /><button type="button" onClick={() => setIsModeSelectorOpen(true)} className="rounded-xl border border-slate-700 px-3 text-xs font-bold text-slate-300 hover:bg-slate-800">{selectedMode?.icon || '✦'}<span className="ml-1 hidden sm:inline">Format</span></button><button disabled={!prompt.trim() || generating} type="submit" className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 to-indigo-600 px-5 text-sm font-black text-white transition hover:from-fuchsia-500 hover:to-indigo-500 disabled:cursor-not-allowed disabled:opacity-50">{generating ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}{generating ? 'Creating' : 'Create'}</button></form>
          {selectedMode && <p className="mt-3 text-xs text-slate-400">Selected format: <span className="font-bold text-purple-300">{selectedMode.name}</span></p>}
          {selectedMode?.id === 'audio_song' && (
            <div className={`mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-2 rounded-2xl border p-3 text-left sm:grid-cols-3 ${theme === 'dark' ? 'border-fuchsia-500/25 bg-fuchsia-500/5' : 'border-fuchsia-200 bg-fuchsia-50'}`}>
              <label className="text-xs font-bold text-slate-300"><span className="mb-1 flex items-center gap-1 text-fuchsia-300"><Music2 className="h-3.5 w-3.5" />Music genre</span><select value={musicGenre} onChange={event => setMusicGenre(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm font-medium text-white"><option>Lo-fi</option><option>Synthwave</option><option>Orchestral</option><option>Ambient</option><option>Hip-hop</option><option>Acoustic</option><option>Bollywood</option></select></label>
              <label className="text-xs font-bold text-slate-300"><span className="mb-1 block text-fuchsia-300">Mood</span><select value={musicMood} onChange={event => setMusicMood(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm font-medium text-white"><option>Focused</option><option>Uplifting</option><option>Epic</option><option>Calm</option><option>Playful</option><option>Dark</option><option>Romantic</option></select></label>
              <label className="text-xs font-bold text-slate-300"><span className="mb-1 block text-fuchsia-300">Song format</span><select value={musicFormat} onChange={event => setMusicFormat(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm font-medium text-white"><option>Instrumental</option><option>Vocal hook</option><option>Background score</option><option>Short intro</option></select></label>
            </div>
          )}
          {selectedMode?.category === 'audio' && selectedMode.id !== 'audio_song' && (
            <div className={`mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-2 rounded-2xl border p-3 text-left sm:grid-cols-2 ${theme === 'dark' ? 'border-sky-500/25 bg-sky-500/5' : 'border-sky-200 bg-sky-50'}`}>
              <label className="text-xs font-bold text-slate-300"><span className="mb-1 block text-sky-300">Voice</span><select value={voiceStyle} onChange={event => setVoiceStyle(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm font-medium text-white"><option>Warm narrator</option><option>Confident presenter</option><option>Friendly conversational</option><option>Calm documentary</option><option>Energetic host</option></select></label>
              <label className="text-xs font-bold text-slate-300"><span className="mb-1 block text-sky-300">Delivery</span><select value={voicePace} onChange={event => setVoicePace(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm font-medium text-white"><option>Natural pace</option><option>Slow and clear</option><option>Fast and energetic</option><option>Measured and authoritative</option></select></label>
            </div>
          )}
          {['visuals', 'video', 'motion'].includes(selectedMode?.category || '') && (
            <div className={`mx-auto mt-4 grid max-w-3xl grid-cols-1 gap-2 rounded-2xl border p-3 text-left sm:grid-cols-2 ${theme === 'dark' ? 'border-violet-500/25 bg-violet-500/5' : 'border-violet-200 bg-violet-50'}`}>
              <label className="text-xs font-bold text-slate-300"><span className="mb-1 block text-violet-300">Visual style</span><select value={visualStyle} onChange={event => setVisualStyle(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm font-medium text-white"><option>Cinematic</option><option>Photorealistic</option><option>Minimal editorial</option><option>3D product render</option><option>Illustrated</option><option>Retro-futurist</option></select></label>
              <label className="text-xs font-bold text-slate-300"><span className="mb-1 block text-violet-300">Color treatment</span><select value={visualPalette} onChange={event => setVisualPalette(event.target.value)} className="w-full rounded-lg border border-slate-700 bg-slate-900 px-2 py-2 text-sm font-medium text-white"><option>Vibrant</option><option>Dark neon</option><option>Warm film</option><option>Pastel</option><option>Monochrome</option><option>Brand-safe neutral</option></select></label>
            </div>
          )}
          {notice && <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400"><CheckCircle2 className="h-4 w-4" />{notice}</p>}{error && <p role="alert" className="mt-4 text-sm font-semibold text-red-400">{error}</p>}
        </section>
        <section className="mt-12"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-xl font-black">Your content</h2><p className="mt-1 text-sm text-slate-400">{loadingAssets ? 'Loading saved work…' : `${assets.length} saved ${assets.length === 1 ? 'item' : 'items'}`}</p></div><History className="h-5 w-5 text-slate-500" /></div>{loadingAssets ? <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-slate-800"><LoaderCircle className="h-6 w-6 animate-spin text-purple-400" /></div> : <MediaStage theme={theme} mediaAssets={assets} activeAssetIndex={activeAssetIndex} onSelectAsset={setActiveAssetIndex} onApplyEdit={(nextPrompt, asset) => generateContent(nextPrompt, null, asset)} onOpenModeSelector={() => setIsModeSelectorOpen(true)} isGenerating={generating} />}</section>
      </main>
      <MultimodalModeSelector isOpen={isModeSelectorOpen} onClose={() => setIsModeSelectorOpen(false)} onSelectMode={selectMode} theme={theme} />
    </div>
  );
}
