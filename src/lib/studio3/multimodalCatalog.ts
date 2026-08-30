export interface MultimodalMode {
  id: string;
  name: string;
  category: string;
  categoryIcon: string;
  icon: string;
  description: string;
  outputType: 'image' | 'animation' | 'canvas_sandbox' | 'video' | 'audio' | 'deck' | 'quiz' | 'mindmap' | 'interactive_html';
  targetTab: 'media';
  promptScaffold: string;
  samplePrompt: string;
  badgeColor: string;
  tags: string[];
}

export interface MultimodalCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export const MULTIMODAL_CATEGORIES: MultimodalCategory[] = [
  { id: 'all', name: 'All Formats', icon: '✨', description: 'Search all 40+ multimodal generation modes' },
  { id: 'visuals', name: 'Static Visuals', icon: '🖼️', description: 'Photorealistic photos, isometric vectors, infographics, 3D renders' },
  { id: 'motion', name: 'Motion & WebGL', icon: '🌀', description: '60fps HTML5 Canvas, WebGL shaders, particle physics, GIF loops' },
  { id: 'video', name: 'Video & Film', icon: '🎬', description: 'Cinematic AI video clips, executive briefings, talking avatars' },
  { id: 'audio', name: 'Audio & Music', icon: '🎙️', description: 'AI multi-host podcasts, speech TTS, songs, soundscape audio' },
  { id: 'knowledge', name: 'Knowledge & Learning', icon: '🧠', description: 'Mind maps, flashcards, decision trees, comparison matrices' },
  { id: 'decks', name: 'Decks & Storyboards', icon: '📑', description: '16:9 slide presentations, interactive carousels, comic strips' },
  { id: 'games', name: 'Games & Puzzles', icon: '🎮', description: 'Interactive trivia quizzes, logic puzzles, scenario simulators' },
  { id: 'data', name: 'Data & Geospatial', icon: '📊', description: '3D Sankey charts, global globe maps, SQL database visualizers' },
  { id: 'science', name: 'Science & Math', icon: '🧬', description: '3D molecular viewers, math surface graphers, circuit simulators' },
  { id: 'uiux', name: 'UI/UX Prototypes', icon: '📱', description: 'Clickable app wireframes, design tokens, responsive landing heroes' },
  { id: 'timelines', name: 'Timelines & Roadmaps', icon: '🗺️', description: 'Interactive historical timelines, Gantt roadmaps, journey maps' },
  { id: 'personas', name: 'Personas & Roleplay', icon: '🎭', description: 'Simulated historical/expert AI personas, illustrated storybooks' },
  { id: 'docs', name: 'Tech Specs & RFCs', icon: '📄', description: 'Live OpenAPI sandboxes, technical architecture RFCs, PRDs' }
];

export const MULTIMODAL_MODES: MultimodalMode[] = [
  // 1. Static Visuals
  {
    id: 'image_photo',
    name: 'Photorealistic Image',
    category: 'visuals',
    categoryIcon: '🖼️',
    icon: '📸',
    description: 'Ultra-high-definition realistic scenes, portraits, and environments with studio lighting.',
    outputType: 'image',
    targetTab: 'media',
    promptScaffold: 'Photorealistic 8K render of ',
    samplePrompt: 'Roman gladiators battling in the sunlit dust of the Colosseum arena',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    tags: ['photo', 'realistic', 'imagen', 'scenery', 'render', 'portrait', 'lighting', 'art', 'cinematic']
  },
  {
    id: 'image_vector',
    name: 'Vector Illustration',
    category: 'visuals',
    categoryIcon: '🖼️',
    icon: '📐',
    description: 'Clean isometric or flat SVG vector art, modern icon sets, and technical graphic illustrations.',
    outputType: 'image',
    targetTab: 'media',
    promptScaffold: 'Clean modern isometric vector illustration of ',
    samplePrompt: 'Cloud data center connected to edge devices with isometric servers',
    badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
    tags: ['vector', 'svg', 'isometric', 'flat', 'illustration', 'graphic', 'icon']
  },
  {
    id: 'image_infographic',
    name: 'Infographic Poster',
    category: 'visuals',
    categoryIcon: '🖼️',
    icon: '📊',
    description: 'High-density educational and technical infographic cheatsheets with stats, badges, and callouts.',
    outputType: 'image',
    targetTab: 'media',
    promptScaffold: 'High-contrast educational infographic poster detailing ',
    samplePrompt: 'Quantum computing principles vs classical computing with key milestone timeline',
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
    tags: ['infographic', 'poster', 'cheatsheet', 'educational', 'breakdown', 'stats']
  },
  {
    id: 'image_3d_product',
    name: '3D Concept & Hardware Render',
    category: 'visuals',
    categoryIcon: '🖼️',
    icon: '🧊',
    description: 'Studio-lit 3D industrial designs, futuristic hardware devices, and spatial objects.',
    outputType: 'image',
    targetTab: 'media',
    promptScaffold: 'Studio-lit 3D industrial concept render of ',
    samplePrompt: 'Futuristic AI neural processing chip with glowing fiber optics and matte aluminum casing',
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
    tags: ['3d', 'render', 'hardware', 'product', 'concept', 'device', 'industrial']
  },
  {
    id: 'image_comic',
    name: 'Comic Strip & Storyboard',
    category: 'visuals',
    categoryIcon: '🖼️',
    icon: '🗯️',
    description: 'Multi-panel illustrated narrative comic strips and visual storyboards.',
    outputType: 'image',
    targetTab: 'media',
    promptScaffold: '4-panel illustrated comic strip explaining ',
    samplePrompt: 'A developer trying to debug race conditions in distributed systems with humorous punchline',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    tags: ['comic', 'storyboard', 'panel', 'humor', 'illustration', 'narrative', 'cartoon']
  },

  // 2. Motion & Dynamic Visuals
  {
    id: 'motion_canvas_sim',
    name: 'Interactive HTML5 Canvas Sim',
    category: 'motion',
    categoryIcon: '🌀',
    icon: '⚡',
    description: '60fps responsive 2D procedural physics animations, particle networks, and interactive graphs.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive 60fps HTML5 Canvas particle simulation of ',
    samplePrompt: 'Neural network synapse firing with mouse-reactive gravity and connection pulses',
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    tags: ['canvas', 'html5', 'physics', 'particle', 'simulation', 'interactive', 'animation', '60fps']
  },
  {
    id: 'motion_webgl_shader',
    name: 'WebGL 3D Shader & Orbit',
    category: 'motion',
    categoryIcon: '🌀',
    icon: '🔮',
    description: 'Real-time WebGL 3D raymarching shaders, planetary orbits, and matrix warp tunnels.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive 3D WebGL shader simulation with orbit controls for ',
    samplePrompt: 'Global satellite constellation orbiting a spinning 3D wireframe Earth with laser cross-links',
    badgeColor: 'bg-violet-950 text-violet-300 border-violet-800',
    tags: ['webgl', '3d', 'shader', 'raymarching', 'orbit', 'threejs', 'glsl']
  },
  {
    id: 'motion_gif',
    name: 'GIF Animation Loop',
    category: 'motion',
    categoryIcon: '🌀',
    icon: '🎞️',
    description: 'Cyclical animated UI micro-interactions, workflow progress loops, and kinetic vector icons.',
    outputType: 'animation',
    targetTab: 'media',
    promptScaffold: 'Smooth looping animated visual of ',
    samplePrompt: 'Continuous data ingestion pipeline streaming blocks into an encrypted blockchain vault',
    badgeColor: 'bg-pink-950 text-pink-300 border-pink-800',
    tags: ['gif', 'loop', 'motion', 'cycle', 'animation', 'microinteraction']
  },
  {
    id: 'motion_data_stream',
    name: 'Live Data Telemetry Stream',
    category: 'motion',
    categoryIcon: '🌀',
    icon: '📈',
    description: 'Procedural live-updating financial candlestick streams, packet routing heatmaps, and telemetry HUDs.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive live-streaming financial telemetry HUD for ',
    samplePrompt: 'High-frequency algorithmic trading order book with live volume depth chart and buy/sell pulses',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    tags: ['telemetry', 'hud', 'data', 'chart', 'stream', 'financial', 'realtime']
  },

  // 3. Video, Film & Clips
  {
    id: 'video_cinematic',
    name: 'Cinematic AI Video Scene',
    category: 'video',
    categoryIcon: '🎬',
    icon: '🎥',
    description: 'Cinematic text-to-video scenes, camera dolly movements, and dynamic lighting shots.',
    outputType: 'video',
    targetTab: 'media',
    promptScaffold: 'Cinematic 4K video clip showing ',
    samplePrompt: 'Drone sweep over an ancient Roman arena as gladiators raise weapons under dramatic sunlight',
    badgeColor: 'bg-red-950 text-red-300 border-red-800',
    tags: ['video', 'cinematic', 'film', 'clip', 'veo', 'movie', 'camera', 'motion']
  },
  {
    id: 'video_avatar',
    name: 'AI Talking Avatar Briefing',
    category: 'video',
    categoryIcon: '🎬',
    icon: '👤',
    description: 'Photorealistic virtual AI spokesperson delivering executive tech briefings with synced lip movements.',
    outputType: 'video',
    targetTab: 'media',
    promptScaffold: 'Executive AI presenter delivering a briefing on ',
    samplePrompt: 'Zero-Trust Architecture principles for enterprise cloud migrations',
    badgeColor: 'bg-orange-950 text-orange-300 border-orange-800',
    tags: ['avatar', 'presenter', 'spokesperson', 'briefing', 'video', 'speech']
  },

  // 4. Audio, Podcasts & Music
  {
    id: 'audio_podcast',
    name: 'AI Multi-Host Podcast',
    category: 'audio',
    categoryIcon: '🎙️',
    icon: '🎧',
    description: 'Two-host conversational podcast with realistic banter, questions, and deep-dive technical insights.',
    outputType: 'audio',
    targetTab: 'media',
    promptScaffold: 'Engaging 2-host tech podcast episode exploring ',
    samplePrompt: 'The Future of AI Coding Agents vs Human Software Engineers: Opportunities and Bottlenecks',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    tags: ['podcast', 'audio', 'conversation', 'hosts', 'discussion', 'interview', 'talk']
  },
  {
    id: 'audio_speech',
    name: 'Speech & Voiceover (TTS)',
    category: 'audio',
    categoryIcon: '🎙️',
    icon: '🗣️',
    description: 'Studio-grade natural text-to-speech voiceovers with selectable accents, pace, and emotional tone.',
    outputType: 'audio',
    targetTab: 'media',
    promptScaffold: 'Narrator voiceover audio for ',
    samplePrompt: 'Welcome to the PromptCanvas Enterprise Architecture masterclass',
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
    tags: ['tts', 'speech', 'voice', 'voiceover', 'narration', 'audio']
  },
  {
    id: 'audio_song',
    name: 'AI Song & Soundtrack Track',
    category: 'audio',
    categoryIcon: '🎙️',
    icon: '🎵',
    description: 'Full generated musical tracks, synthwave anthems, orchestral themes, and lo-fi focus beats.',
    outputType: 'audio',
    targetTab: 'media',
    promptScaffold: 'Synthwave cybernetic soundtrack for ',
    samplePrompt: 'Late-night high-octane coding session with driving analog synth bassline and retro drums',
    badgeColor: 'bg-fuchsia-950 text-fuchsia-300 border-fuchsia-800',
    tags: ['music', 'song', 'soundtrack', 'synthwave', 'orchestral', 'beat', 'audio']
  },

  // 5. Knowledge & Learning
  {
    id: 'knowledge_mindmap',
    name: 'Interactive Mind Map',
    category: 'knowledge',
    categoryIcon: '🧠',
    icon: '🌳',
    description: 'Radial expanding concept trees with collapsible branches, node notes, and relational links.',
    outputType: 'mindmap',
    targetTab: 'media',
    promptScaffold: 'Comprehensive radial mind map breaking down ',
    samplePrompt: 'Machine Learning algorithms from Supervised to Reinforcement Learning and Transformers',
    badgeColor: 'bg-teal-950 text-teal-300 border-teal-800',
    tags: ['mindmap', 'concept', 'tree', 'hierarchy', 'knowledge', 'radial', 'nodes']
  },
  {
    id: 'knowledge_flashcards',
    name: 'Interactive Flashcards Deck',
    category: 'knowledge',
    categoryIcon: '🧠',
    icon: '📇',
    description: 'Flip-card spaced repetition decks with key definitions, code snippets, and mastery counters.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: '10-card study flashcard deck covering ',
    samplePrompt: 'GCP Cloud Architecture Certification key networking and IAM terms',
    badgeColor: 'bg-yellow-950 text-yellow-300 border-yellow-800',
    tags: ['flashcards', 'study', 'cards', 'learning', 'quiz', 'memory', 'flip']
  },
  {
    id: 'knowledge_decision_tree',
    name: 'Decision Tree & Logic Flow',
    category: 'knowledge',
    categoryIcon: '🧠',
    icon: '🌿',
    description: 'Step-by-step diagnostic decision gates guiding users to the optimal architecture or strategy.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Interactive diagnostic decision tree for ',
    samplePrompt: 'Choosing the right database: Spanner vs BigQuery vs Memorystore vs Cloud SQL',
    badgeColor: 'bg-lime-950 text-lime-300 border-lime-800',
    tags: ['decision', 'tree', 'flow', 'diagnostic', 'matrix', 'strategy', 'troubleshooting']
  },

  // 6. Slide Decks & Documents
  {
    id: 'deck_presentation',
    name: '16:9 Slide Presentation',
    category: 'decks',
    categoryIcon: '📑',
    icon: '🖥️',
    description: 'Executive 16:9 multi-slide deck with dark glassmorphic layouts, key bullet metrics, and speaker notes.',
    outputType: 'deck',
    targetTab: 'media',
    promptScaffold: '5-slide executive presentation on ',
    samplePrompt: 'Enterprise AI Modernization: ROI, Security Guardrails, and Implementation Roadmap',
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
    tags: ['slides', 'deck', 'presentation', 'powerpoint', 'keynote', 'executive', 'pitch']
  },
  {
    id: 'deck_carousel',
    name: 'Interactive Story Carousel',
    category: 'decks',
    categoryIcon: '📑',
    icon: '🎠',
    description: 'Swipeable interactive story cards with gradient backdrops and step-by-step feature reveals.',
    outputType: 'deck',
    targetTab: 'media',
    promptScaffold: 'Step-by-step visual story carousel explaining ',
    samplePrompt: 'How modern LLM Context Caching and Token Attention works under the hood',
    badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
    tags: ['carousel', 'cards', 'story', 'swipe', 'stepper', 'walkthrough']
  },
  {
    id: 'doc_one_pager',
    name: 'Executive One-Pager Brief',
    category: 'decks',
    categoryIcon: '📑',
    icon: '📋',
    description: 'Dense, beautifully structured single-page executive summary with KPI badges and strategic pillars.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Executive one-pager strategy document for ',
    samplePrompt: 'Multi-Region Cloud Disaster Recovery Architecture & RPO/RTO Targets',
    badgeColor: 'bg-slate-900 text-slate-200 border-slate-700',
    tags: ['onepager', 'brief', 'summary', 'executive', 'whitepaper', 'kpi']
  },

  // 7. Games & Interactive Simulators
  {
    id: 'game_quiz',
    name: 'Interactive Quiz & Trivia',
    category: 'games',
    categoryIcon: '🎮',
    icon: '🎯',
    description: 'Gamified multiple-choice quiz with timer, instant explanation cards, score tally, and celebration animations.',
    outputType: 'quiz',
    targetTab: 'media',
    promptScaffold: '5-question interactive multiple-choice quiz testing ',
    samplePrompt: 'Distributed Systems & CAP Theorem mastery with tricky scenario questions',
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
    tags: ['quiz', 'trivia', 'game', 'test', 'questions', 'score', 'assessment']
  },
  {
    id: 'game_puzzle',
    name: 'Logic Puzzles & Brainteasers',
    category: 'games',
    categoryIcon: '🎮',
    icon: '🧩',
    description: 'Interactive grid logic puzzles, code breaker challenges, crossword grids, and cryptograms.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Interactive logic puzzle game based on ',
    samplePrompt: 'Deadlock detection in mutex locks with step-by-step interactive resolution',
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
    tags: ['puzzle', 'logic', 'brainteaser', 'crossword', 'game', 'riddle']
  },
  {
    id: 'game_physics_sandbox',
    name: 'Physics Playground Sandbox',
    category: 'games',
    categoryIcon: '🎮',
    icon: '🪐',
    description: 'Real-time interactive physics engine with draggable bodies, gravitational wells, friction sliders, and collision forces.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive physics sandbox simulating ',
    samplePrompt: 'Centripetal vs Centrifugal forces with adjustable velocity and string snapping dynamics',
    badgeColor: 'bg-teal-950 text-teal-300 border-teal-800',
    tags: ['physics', 'sandbox', 'gravity', 'simulation', 'collision', 'matterjs', 'interactive']
  },

  // 8. Data, Analytics & Geospatial
  {
    id: 'data_sankey_3d',
    name: 'Interactive 3D Data & Sankey Chart',
    category: 'data',
    categoryIcon: '📊',
    icon: '🌊',
    description: 'Flowing multi-stage Sankey diagrams, 3D scatter topologies, Voronoi treemaps, and animated heatmaps.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive animated Sankey data flow chart for ',
    samplePrompt: 'Enterprise cloud spend breakdown from compute, storage, egress to AI API consumption',
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    tags: ['sankey', 'chart', 'data', 'analytics', 'flow', 'heatmap', 'treemap', '3d']
  },
  {
    id: 'data_globe_map',
    name: '3D Geospatial Globe Map',
    category: 'data',
    categoryIcon: '📊',
    icon: '🌐',
    description: 'Spinning 3D Earth with animated cross-continental latency arcs, regional data hubs, and heat zones.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive 3D spinning globe visualizing ',
    samplePrompt: 'Global submarine fiber optic cables and cloud region multi-active latency rings',
    badgeColor: 'bg-blue-950 text-blue-300 border-blue-800',
    tags: ['globe', 'map', 'geospatial', '3d', 'earth', 'regions', 'latency', 'world']
  },
  {
    id: 'data_sql_schema',
    name: 'Database Schema & Query Visualizer',
    category: 'data',
    categoryIcon: '📊',
    icon: '🗄️',
    description: 'Interactive relational ER diagram with clickable foreign key paths and live SQL query syntax builders.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Interactive relational database ER diagram for ',
    samplePrompt: 'E-commerce order fulfillment system with users, orders, inventory, and ledger transactions',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    tags: ['database', 'schema', 'sql', 'er', 'relational', 'tables', 'postgres', 'spanner']
  },

  // 9. Science, Biotech & Math
  {
    id: 'science_molecule_3d',
    name: '3D Molecular & Protein Viewer',
    category: 'science',
    categoryIcon: '🧬',
    icon: '🔬',
    description: 'Interactive 3D chemical molecules, DNA double-helices, and protein crystal ribbon models with rotation controls.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive 3D molecular ribbon viewer for ',
    samplePrompt: 'CRISPR Cas9 protein interacting with targeted DNA double-helix strand',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    tags: ['molecule', 'protein', 'dna', 'biotech', 'chemistry', 'science', '3d', 'pdb']
  },
  {
    id: 'science_math_surface',
    name: 'Math 3D Surface Grapher',
    category: 'science',
    categoryIcon: '🧬',
    icon: '📐',
    description: 'Parametric 3D mathematical manifold visualizer, gradient descent valleys, and vector field streamlines.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive 3D math surface grapher visualizing ',
    samplePrompt: 'Gradient descent optimization traversing a complex multi-modal loss landscape',
    badgeColor: 'bg-indigo-950 text-indigo-300 border-indigo-800',
    tags: ['math', 'surface', 'calculus', 'manifold', 'vector', 'gradient', 'topology']
  },
  {
    id: 'science_circuit_sim',
    name: 'Logic Circuit Simulator',
    category: 'science',
    categoryIcon: '🧬',
    icon: '💡',
    description: 'Interactive breadboard simulator with toggleable AND/OR/XOR gates, glowing wires, and clock pulses.',
    outputType: 'canvas_sandbox',
    targetTab: 'media',
    promptScaffold: 'Interactive digital logic circuit simulator for ',
    samplePrompt: '4-bit Full Adder with carry-in/out toggles and live binary sum readout',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    tags: ['circuit', 'electronics', 'logic', 'gates', 'breadboard', 'binary', 'simulator']
  },

  // 10. UI/UX & Digital Products
  {
    id: 'ui_wireframe_app',
    name: 'Clickable App Wireframe',
    category: 'uiux',
    categoryIcon: '📱',
    icon: '📲',
    description: 'Interactive mobile / desktop wireframe prototype with working tab navigation, modals, and input states.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Interactive clickable modern web app prototype for ',
    samplePrompt: 'AI Medical Imaging Diagnostic Dashboard with scan upload, anomaly heatmaps, and doctor approvals',
    badgeColor: 'bg-sky-950 text-sky-300 border-sky-800',
    tags: ['wireframe', 'ui', 'ux', 'prototype', 'mockup', 'app', 'interactive', 'interface']
  },
  {
    id: 'ui_design_tokens',
    name: 'Design System & Token Guide',
    category: 'uiux',
    categoryIcon: '📱',
    icon: '🎨',
    description: 'Living design system gallery with typography scales, color contrast checkers, glassmorphic card tokens, and button states.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Modern dark glassmorphic design system token guide for ',
    samplePrompt: 'Fintech trading platform design system with neon accents and WCAG AA contrast tokens',
    badgeColor: 'bg-purple-950 text-purple-300 border-purple-800',
    tags: ['design', 'system', 'tokens', 'colors', 'typography', 'components', 'styleguide']
  },

  // 11. Timelines & Roadmaps
  {
    id: 'timeline_chronological',
    name: 'Interactive Historical Timeline',
    category: 'timelines',
    categoryIcon: '🗺️',
    icon: '⏳',
    description: 'Smooth horizontal scrolling timeline with expandable milestone cards, media tags, and epoch markers.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Interactive scrollable timeline exploring ',
    samplePrompt: 'The History of Artificial Intelligence from the Turing Test (1950) to Gemini and Transformers',
    badgeColor: 'bg-amber-950 text-amber-300 border-amber-800',
    tags: ['timeline', 'history', 'chronological', 'milestones', 'roadmap', 'events']
  },
  {
    id: 'timeline_gantt_roadmap',
    name: 'Product Release Gantt Roadmap',
    category: 'timelines',
    categoryIcon: '🗺️',
    icon: '📅',
    description: 'Quarterly milestone Gantt chart with phase dependencies, critical path indicators, and deliverable status pills.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Quarterly product engineering Gantt roadmap for ',
    samplePrompt: 'Enterprise Multi-Cloud Kubernetes Migration over Q1-Q4',
    badgeColor: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    tags: ['gantt', 'roadmap', 'quarters', 'milestones', 'planning', 'dependencies', 'project']
  },

  // 12. Personas, Roleplay & Tech Specs
  {
    id: 'persona_ai_simulator',
    name: 'Simulated AI Persona Dialogue',
    category: 'personas',
    categoryIcon: '🎭',
    icon: '🧙‍♂️',
    description: 'Interactive simulated conversation with historical figures, scientists, or fictional specialists.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Interactive persona chat simulation with ',
    samplePrompt: 'Roman Emperor Marcus Aurelius discussing stoic philosophy and modern high-pressure decisions',
    badgeColor: 'bg-rose-950 text-rose-300 border-rose-800',
    tags: ['persona', 'roleplay', 'dialogue', 'chat', 'historical', 'character', 'simulation']
  },
  {
    id: 'doc_openapi_sandbox',
    name: 'Live OpenAPI / Swagger Sandbox',
    category: 'docs',
    categoryIcon: '📄',
    icon: '⚡',
    description: 'Interactive REST API tester with collapsible endpoints, mock response generators, and cURL commands.',
    outputType: 'interactive_html',
    targetTab: 'media',
    promptScaffold: 'Interactive OpenAPI REST API sandbox documentation for ',
    samplePrompt: 'PromptCanvas Generation & Diagramming API with authentication, synthesize, and export endpoints',
    badgeColor: 'bg-cyan-950 text-cyan-300 border-cyan-800',
    tags: ['api', 'openapi', 'swagger', 'rest', 'endpoints', 'documentation', 'curl']
  }
];
