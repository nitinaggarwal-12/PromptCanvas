---
name: ui-first-design-system
description: High-craft UI design system guidelines, visual mockup pre-flights, rich micro-interactions, dark mode glassmorphism tokens, and zero-iteration frontend architecture rules.
---

# UI-First Design System & High-Craft Frontend Architecture

This skill ensures that every new page, component, or layout built is delivered with state-of-the-art visual excellence, eliminating the need for iterative UI polishing.

## 1. Core Visual Principles ("Zero-Iteration UI")

1. **Never Build Minimal Viable Designs**: Never output standard browser defaults, plain gray cards, or basic unstyled tables. Every component must feature glassmorphism, surface elevation, subtle glowing borders, and curated dark HSL color palettes.
2. **Proportional Desktop Scaling (`max-w-8xl`)**: Design for spacious desktop monitors (`max-w-8xl` / 1440px+ or `max-w-[1600px]`) with proportional typography (`text-2xl` to `text-4xl`), generous grid gaps (`gap-6` to `gap-8`), and edge-to-edge backdrop blur navbars.
3. **Rich Micro-Interactions Built-In**:
   - Hover scaling (`hover:scale-[1.02] hover:-translate-y-0.5`).
   - Click press states (`active:scale-[0.98]`).
   - Smooth transitions (`transition-all duration-200 ease-out`).
   - Focus rings (`focus:ring-2 focus:ring-teal-500/50 focus:border-teal-400`).

## 2. Design System Token Standards

```tsx
// Surface Panel Token
className="glass-panel p-6 rounded-2xl border border-panel-border/40 bg-slate-900/40 backdrop-blur-xl shadow-xl hover:border-teal-500/40 transition-all duration-300"

// Primary Glow Button Token
className="px-6 py-3 rounded-xl bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 hover:from-teal-300 hover:to-emerald-300 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"

// Status Badge Pills
className="shrink-0 text-[10px] font-extrabold text-teal-300 bg-teal-500/20 px-2.5 py-1 rounded-md border border-teal-500/40 shadow-sm"
```

## 3. Pre-Flight Visual Validation Protocol

1. Before declaring any UI component complete, launch Puppeteer in background mode.
2. Capture a high-resolution 1600x950 screenshot saved to `scratch/screenshots_<task_id>/`.
3. Visually inspect screenshot for contrast, padding balance, icon alignment, and responsive grid balance.
