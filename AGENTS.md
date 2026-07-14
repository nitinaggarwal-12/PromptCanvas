<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# 🎨 Layout & Typography Rules (Desktop Monitors)

* **Reclaim Empty Margins (Wide Widths)**: By default, design portals and landing pages to use spacious desktop widths (`max-w-8xl` (1440px) or `max-w-[1600px]`) instead of standard narrow grids (`max-w-5xl`, `max-w-7xl`). Utilize adequate padding (`px-12 md:px-16` or `px-10 md:px-12`) to optimize viewing on ultra-wide desktop monitors.
* **Proportional Object & Typography Scaling (Always)**: When expanding container widths, you must scale up all layout components, typography, and visual assets proportionally to maintain structural balance:
  - **Typography**: Main headers (`text-4xl` -> `text-5xl` or `text-6xl`), text descriptions (`text-xs`/`text-sm` -> `text-sm`/`text-base`), and data counters (`text-xl` -> `text-3xl` or `text-4xl`).
  - **Gaps & Padding**: Layout vertical/horizontal padding (`py-10 px-8` -> `py-14 px-12 md:px-16`) and grid spacing (`gap-4` -> `gap-6` or `gap-8`).
  - **Controls & Buttons**: Buttons padding (`px-4 py-2 text-xs` -> `px-6 py-2.5 text-sm` / `px-8 py-4 text-base`) and input fields.
  - **Icons & Images**: Vector icons (`w-3.5 h-3.5` -> `w-4 h-4` or `w-5 h-5`) and static media assets (`width={400}` -> `width={500}`).
* **Sticky Full-Width Navbars**: Sticky headers (`sticky top-0`) must be constructed with a full-width background wrapper (`w-full bg-... backdrop-blur-...`) to ensure the blur/fill bleeding is edge-to-edge, centering the actual menu controls within the page alignment constraint (e.g. `max-w-8xl mx-auto px-6 md:px-12`).
