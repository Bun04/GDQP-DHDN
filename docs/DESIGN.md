---
name: GDQP-AN Ôn Thi
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#434840'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#74796f'
  outline-variant: '#c3c8bd'
  surface-tint: '#4b6542'
  primary: '#061e04'
  on-primary: '#ffffff'
  primary-container: '#1b3315'
  on-primary-container: '#809d75'
  inverse-primary: '#b1cfa4'
  secondary: '#48663b'
  on-secondary: '#ffffff'
  secondary-container: '#c9edb6'
  on-secondary-container: '#4e6c41'
  tertiary: '#2b1300'
  on-tertiary: '#ffffff'
  tertiary-container: '#492400'
  on-tertiary-container: '#df7c0f'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#cdebbf'
  primary-fixed-dim: '#b1cfa4'
  on-primary-fixed: '#092005'
  on-primary-fixed-variant: '#344d2c'
  secondary-fixed: '#c9edb6'
  secondary-fixed-dim: '#aed09c'
  on-secondary-fixed: '#052101'
  on-secondary-fixed-variant: '#314e26'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Be Vietnam Pro
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
  headline-xl-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
  headline-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-lg-mobile:
    fontFamily: Be Vietnam Pro
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Be Vietnam Pro
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 26px
  body-md:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Be Vietnam Pro
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system drives a focused, authoritative, and motivating mobile-first educational environment tailored for Vietnamese university students preparing for Military and Security Education (Giáo dục Quốc phòng và An ninh - Học phần 1).

### Brand Identity & Emotional Resonance
The interface balances the disciplined, steadfast precision of military institutions with the friction-free clarity of modern academic study tools. It fosters confidence, mental readiness, and high cognitive stamina during intense practice drills and mock examinations. The visual tone avoids aggressive militarism, leaning instead into institutional dignity, structured focus, and gamified academic accomplishment.

### Design Movement
**Tactical Modernism:** A hybrid of refined minimalism and high-structure institutional UI. The aesthetic combines:
- Crisp white elevated study cards over a calm, low-glare neutral backdrop.
- Bold military-inspired deep olive accents paired with brass and gold insignias.
- Rigorous typographic cadence delivering exceptional Vietnamese character legibility.
- Instant, high-contrast semantic feedback loops for fast drill memorization.

## Colors

The palette grounds the student in traditional national defense tones while maintaining strict WCAG 2.1 AAA contrast ratios for prolonged screen sessions.

### Core Architecture
- **Primary (`#1B3315`):** Deep Forest Army Green. Anchor for top application bars, final score banners, primary navigation markers, and prominent interactive buttons.
- **Secondary (`#2D4A22`):** Tactical Olive Green. Used for module badges, secondary active states, and sub-header accents.
- **Tertiary (`#D97706` / Highlight `#F59E0B`):** Brass & Gold Star insignia. Highlights streaks, review bookmarking, performance badges, and ranked honors.
- **Neutral Surface & Canvas (`#F8FAFC` to `#F1F5F9`):** Cool slate tints engineered to reduce retinal fatigue compared to pure white, allowing elevated `#FFFFFF` study cards to achieve clean foreground separation.

### Fixed Semantic Assessment Tones
- **Success (`#16A34A`):** Verified correct answer states, success callouts, and passing grade metrics.
- **Critical / Incorrect (`#DC2626`):** Incorrect selections, negative score deductions, and critical review prompts.
- **Flagged / Review (`#EAB308`):** Saved/bookmarked questions for subsequent review sessions.
- **Slate Text Neutrals (`#0F172A` title, `#334155` body, `#94A3B8` disabled):** Crisp hierarchical legibility.

## Typography

The type system exclusively implements **Be Vietnam Pro**. Engineered natively with authentic Vietnamese diacritics, it eliminates tone mark clipping, irregular baseline shifts, and visual clutter in technical military terminology.

### Hierarchy & Usage
- **Headline Tiers:** Reserved for exam set headers, final evaluation summaries, and section titles. Rendered at weights `600` and `700` with tighter tracking for a disciplined, commanding tone.
- **Question Stems (`title-md` / `body-lg`):** Kept at a confident `500` or `600` weight with expanded 1.6x line heights to maximize readability under time constraints.
- **Answer Choices (`body-lg` / `body-md`):** Scaled to guarantee scanning speed across complex legal and theoretical options.
- **Data & Micro-Labels (`label-sm`, `label-md`):** Uppercase tracking applied to countdown timers, question counters (`CÂU 12/40`), and status badges.

## Layout & Spacing

A mobile-first fluid layout that seamlessly bridges handheld drill modes with desktop multi-column test consoles.

### Spatial Rhythm
Built on an 8-point base spatial cadence. Touch-first targets strictly preserve a minimum interactive dimension of 48px by 48px to eliminate mis-clicks during rapid, timed assessments.

### Form Factor Adaptations
- **Mobile (< 640px):** Single-column layout. The question prompt and answer options fill the viewport with fixed bottom progress controllers and an anchoring navigation dock. Outer margins are fixed to `1rem` (`16px`).
- **Tablet (640px - 1024px):** 8-column layout. The core question interface centers within a comfortable 640px container, introducing floating question quick-jump drawers.
- **Desktop (> 1024px):** 12-column layout. Max-width set to `1120px` with a persistent dual-pane hierarchy: the left 8 columns contain the active question and explanation stage, while the right 4 columns house the real-time question status matrix, countdown timer, and category analytics.

## Elevation & Depth

This design system replaces heavy drop-shadows with structured tonal layers, crisp micro-borders, and ambient olive-tinted diffusion.

### Elevation Levels
- **Level 0 (Base Canvas):** Background color `#F8FAFC`. Completely flat; non-interactive ground plane.
- **Level 1 (Study Cards & Answer Options):** Pure `#FFFFFF` fill with a `1px` structural boundary in `#E2E8F0`. Soft ambient shadow: `0px 2px 8px -2px rgba(27, 51, 21, 0.05)`.
- **Level 2 (Active Question Container / Floating Control Bars):** `#FFFFFF` fill supported by an elevated blur: `0px 8px 24px -4px rgba(27, 51, 21, 0.08)`.
- **Level 3 (Modal Sheets, Result Drawers, Timed Dialogs):** Centered floating depth using `0px 20px 32px -8px rgba(15, 23, 42, 0.16)`.

### State Elevations
Hovered and active selectable answers shift border tinting rather than popping heavily off the Z-axis, preserving visual stability and focus.

## Shapes

The design system incorporates soft, disciplined curvature (`roundedness: 2`). This avoids extreme hyper-rounded pill shapes in favor of structured geometric clarity that echoes military field equipment, tactical panels, and modern study software.

### Corner Curvature Rules
- **Base Components (Input fields, answer options, primary action buttons):** `0.5rem` (`rounded-md` / `8px`) to `0.75rem` (`12px`).
- **Cards & Primary Modules:** `1rem` (`rounded-xl` / `16px`) for question cards and informational panels.
- **Major Focus Containers & Bottom Sheets:** `1.5rem` (`rounded-2xl` / `24px`) along top sheet edges and result celebration cards.
- **Tags, Status Pills, and Step Indicators:** Full circle or pill forms (`9999px`) exclusively reserved for micro badges and number indices.

## Components

### Buttons
- **Primary Exam Action:** Deep forest green (`#1B3315`) background, `#FFFFFF` text, `rounded-xl`, min-height 52px on mobile. Active feedback: scale `0.98` with background darkening to `#13260F`.
- **Secondary / Flag Action:** Subtle `#FEF3C7` background with `#D97706` text and border for mark-for-review actions.
- **Ghost Navigation:** Transparent base with `#334155` text for back and skip actions.

### Multiple-Choice Answer Cards
- **Default State:** `#FFFFFF` background, `1.5px` border in `#E2E8F0`, `rounded-xl`, minimum height 56px with generous horizontal padding (`space-md`). Letter badge (A, B, C, D) housed in a neutral slate container (`#F1F5F9`).
- **Selected (Pre-submit):** `#F0FDF4` background, `2px` solid border in `#2D4A22`, with high-contrast text.
- **Correct State:** Instant transition to `#DCFCE7` background, `2px` border in `#16A34A`, leading check icon in `#16A34A`.
- **Incorrect State:** `#FEE2E2` background, `2px` border in `#DC2626`, leading cross icon in `#DC2626`.

### Question Matrix & Indicator Grid
- A persistent grid of numbered square chips (36px × 36px) tracking drill progression:
  - *Unanswered:* `#F1F5F9` with `#64748B` text.
  - *Current Active:* `#1B3315` background with bold `#FFFFFF` text.
  - *Answered:* `#E2E8F0` with solid `#1E293B` dot.
  - *Flagged for Review:* `#FEF3C7` background with `#D97706` border and top-right indicator pin.

### Badges & Rank Indicators
- High-visibility chips displaying Module IDs (e.g., `HP1: ĐƯỜNG LỐI QUỐC PHÒNG`) utilizing `#2D4A22` tinted backgrounds with crisp uppercase typography.
- Performance rank badges featuring military star motifs utilizing gold `#D97706` accents.

### Timer & Progress Bar
- Fixed top progress track (height 6px) with an animated fill transitioning from `#2D4A22` to `#D97706` as the question count proceeds.
- High-contrast tactical countdown display showing remaining minutes and seconds with tabular numeral alignment.