---
name: Playful Computational Learning
colors:
  surface: '#f9f9ff'
  surface-dim: '#cfdaf2'
  surface-bright: '#f9f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f0f3ff'
  surface-container: '#e7eeff'
  surface-container-high: '#dee8ff'
  surface-container-highest: '#d8e3fb'
  on-surface: '#111c2d'
  on-surface-variant: '#3f4850'
  inverse-surface: '#263143'
  inverse-on-surface: '#ecf1ff'
  outline: '#707881'
  outline-variant: '#bfc7d2'
  surface-tint: '#006398'
  primary: '#006194'
  on-primary: '#ffffff'
  primary-container: '#007bb9'
  on-primary-container: '#fdfcff'
  inverse-primary: '#93ccff'
  secondary: '#006c49'
  on-secondary: '#ffffff'
  secondary-container: '#6cf8bb'
  on-secondary-container: '#00714d'
  tertiary: '#825100'
  on-tertiary: '#ffffff'
  tertiary-container: '#a36700'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cce5ff'
  primary-fixed-dim: '#93ccff'
  on-primary-fixed: '#001d31'
  on-primary-fixed-variant: '#004b73'
  secondary-fixed: '#6ffbbe'
  secondary-fixed-dim: '#4edea3'
  on-secondary-fixed: '#002113'
  on-secondary-fixed-variant: '#005236'
  tertiary-fixed: '#ffddb8'
  tertiary-fixed-dim: '#ffb95f'
  on-tertiary-fixed: '#2a1700'
  on-tertiary-fixed-variant: '#653e00'
  background: '#f9f9ff'
  on-background: '#111c2d'
  surface-variant: '#d8e3fb'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '500'
    lineHeight: 28px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-code:
    fontFamily: Space Grotesk
    fontSize: 15px
    fontWeight: '600'
    lineHeight: 20px
  label-badge:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system targets elementary school students (Grades 1–6, ages 6–12) alongside educators and parents. The visual language merges structured educational clarity with cheerful, tactile interactivity. It avoids visual clutter, chaotic toy-like tropes, and dark gamified techno palettes, relying instead on clean light canvases, generous negative space, and vibrant, purposeful semantic color accents.

The aesthetic blends **Tactile / Soft Neomorphic Depth** with a **Clean Modern Flat** baseline:
- **Tone:** Encouraging, bright, clear, and adventurous.
- **Affordance:** Physical, pressable interaction cues (soft bottom-edge extrusion borders) that mimic block-coding bricks and mechanical tactile keys, reassuring young learners through distinct visual affordances.
- **Structure:** Crisp modular visual containers that break complex computational logic (loops, conditionals, sequencing) into digestible, bite-sized visual units.

## Colors

The palette is engineered for high legibility, positive reinforcement, and clear semantic status. 

### Palette Roles
- **Primary (`#0284C7` / `#38BDF8`):** Sky Blue. Drives identity, main navigation tabs, sequence block highlights, and primary actions.
- **Secondary (`#10B981` / `#34D399`):** Mint Green. Denotes logic validation, success triggers, run/play actions, and completion achievements.
- **Tertiary (`#F59E0B` / `#FBBF24`):** Warm Amber Yellow. Highlights stars, streak counters, hints, loop logic, and bonus challenges.
- **Accent Coral (`#EF4444` / `#F87171`):** Soft Red. Used strictly for error recovery, stop actions, and debugging prompts—calibrated to feel corrective rather than punishing.
- **Neutral Dark (`#1E293B` / `#334155`):** Deep Slate. Replaces harsh pure black for all typography and vector icons, maintaining maximum readability without eye strain.
- **Neutral Surface (`#F8FAFC` to `#FFFFFF`):** Crisp pure white cards float against a light slate/sky-tinted foundation (`#F0F9FF` or `#F8FAFC`).

## Typography

The typography couples the open, warm counters of **Plus Jakarta Sans** with the structural, geometric personality of **Space Grotesk** for code-adjacent parameters and numerical scoring:
- **Letter Spacing & Open Shapes:** Generous x-height prevents cognitive fatigue in early readers (grades 1–3).
- **Line Heights:** Set slightly wider than standard application typography to support word-tracking for developing reading proficiencies.
- **Monospace & Logic Variables:** `label-code` uses Space Grotesk to give block commands (e.g., `REPEAT 4`, `STEP_FORWARD`) distinct structural definition without feeling overly dense.

## Layout & Spacing

The layout is anchored on an 8pt grid with large target frames suited to touch surfaces and tablet interaction in classroom environments:
- **Grid Layout:** 12-column fluid grid for desktop (minimum container 1200px), 8-column for tablet landscape/portrait, and a responsive 4-column layout on mobile.
- **Target Areas:** All actionable touch points (coding blocks, navigation arrows, game triggers) maintain a minimum footprint of 48×48px.
- **Section Margins:** Plentiful outer margins (`2rem` desktop, `1rem` mobile) preserve canvas clarity and prevent visual crowding around coding workspaces.

## Elevation & Depth

To provide intuitive push-and-drag interactions without heavy realistic skeuomorphism, elevation relies on clean, low-blur tactile drops and solid bottom offset boundaries:

- **Level 0 (Flat Ground):** Canvas background (`#F0F9FF` or `#F8FAFC`) with no shadow.
- **Level 1 (Content Surfaces & Cards):** Pure white surface, a 2px stroke tinted with `#E2E8F0`, and an ambient shadow: `0 4px 12px -2px rgba(15, 23, 42, 0.05)`.
- **Level 2 (Tactile Interactive Blocks & Buttons):** Uses a solid bottom border offset (`box-shadow: 0 4px 0 0 [Darker-Shade]`) instead of blurred drop shadows. When hovered, the offset stays; when active/pressed, the element translates down by 2px to 4px with a corresponding collapse in offset, simulating a physical keypress.
- **Level 3 (Modals & Overlays):** `0 20px 30px -10px rgba(15, 23, 42, 0.12)` paired with a soft backdrop wash (`rgba(15, 23, 42, 0.35)`).

## Shapes

The shape system employs roundedness level **2**, striking a balanced harmony between soft, friendly contours and precise layout docking:
- **Base Components (Inputs, Buttons, Code Bricks):** `0.75rem` (12px) to `1rem` (16px) border-radius.
- **Card Containers & Modal Panes:** `1.25rem` (20px) to `1.5rem` (24px) for prominent modular units.
- **Badges, Status Chips, and Steppers:** Fully pill-shaped (`9999px`) to immediately signal secondary tags, level indicators, and non-editable labels.

## Components

### Buttons
- **Tactile Primary (Blue):** Sky Blue background (`#0284C7`), text white, with a solid bottom-lip extrusion (`#0369A1`, 4px thick). Hover brightens background; active state translates `translateY(3px)` with a 1px remaining extrusion lip.
- **Tactile Success / Run (Green):** Mint Green background (`#10B981`) with bottom extrusion (`#059669`). Used exclusively for "Run Code" and "Check Answer".
- **Ghost/Tertiary:** Pure white with a 2px border in `#E2E8F0` and neutral text (`#334155`), with an inset hover state.

### Coding Blocks & Tiles
- Snap-together appearance with modular pill-cut tabs.
- Left-edge visual accent stripes corresponding to computational concepts: Blue for Actions, Amber for Loops, Red/Coral for Logic/Conditionals, Mint for Events.
- Highly visible typography (`label-code`) in high-contrast ink (`#1E293B`).

### Chips & Badges
- Pill-shaped (`rounded-full`), padded `space-xs` vertically and `space-sm` horizontally.
- Subtle tinted backgrounds (10% opacity of parent color) with full-saturation text (e.g., Level 1 chip: `#E0F2FE` background with `#0369A1` text).

### Cards
- Surface background of `#FFFFFF`, 2px solid border in `#F1F5F9`, rounded at 20px–24px.
- Internal padding using `space-lg` (24px). Headers house child-friendly vector illustrations and clear badge metrics.

### Input Fields & Selectors
- Thick, clear 2px outline in `#CBD5E1`, focusing to `#38BDF8` with an additional `0 0 0 3px rgba(56, 189, 248, 0.2)` ring.
- Large numerical steppers with distinct circular `+` and `-` tactile buttons to assist young typists.

### Checkboxes & Radios
- Oversized square-rounded (8px) for checkboxes and circles (24px diameter) for radios.
- Crisp fill with white iconography (checkmark or dot) upon selection, eliminating ambiguous outline-only states.