# EPROM Brand & Theme Guide

A reusable design-system reference for building any project in **EPROM** brand style.
Values were extracted from the live corporate site ([eprom.com.eg](https://eprom.com.eg/),
built on the Salient WordPress theme). Drop the tokens below into any project.

> **EPROM** — Egyptian Projects Operation & Maintenance Co.
> Tagline: **"Committed to Energy. Built on Trust."**
> Sector: Oil & Gas — Operations, Maintenance, Commissioning, Environmental services.

---

## 1. Color Palette

### Primary brand colors
| Token | Hex | RGB | Usage |
|---|---|---|---|
| **EPROM Blue** (primary) | `#00529b` | `0, 82, 155` | Primary brand color — headers, links, primary buttons, key accents |
| **EPROM Lime** (secondary) | `#8cc63f` | `140, 198, 63` | Secondary accent — highlights, success, the logo's leaf mark |
| **Bright Blue** | `#3f82ff` | `63, 130, 255` | Interactive/hover blue, secondary data series |
| **White** | `#ffffff` | `255, 255, 255` | Backgrounds, cards, negative space |

### Supporting / neutral colors
| Token | Hex | Usage |
|---|---|---|
| Deep blue (hover) | `#0a6fb8` | Hover state for blue, mid-stop in brand gradient |
| Lime (alt) | `#70c600` | Brighter green variant |
| Ink / text | `#0f2438` | Primary body text (blue-tinted near-black) |
| Muted text | `#5a6f84` | Secondary text, labels, captions |
| Page background | `#eef2f7` | App/page background (cool light gray) |
| Panel-2 / fill | `#f3f6fa` | Subtle fills, table headers, chips |
| Border | `#d4dde8` | Default borders / dividers |
| Border bright | `#b3c2d4` | Emphasized borders |

### Semantic status colors
| Meaning | Hex |
|---|---|
| Success / good | `#6aa81f` (brand-leaning) or `#8cc63f` |
| Warning | `#d97706` |
| Error / danger | `#dc2626` |
| Info | `#00529b` |

### Signature brand gradient
```
linear-gradient(90deg, #00529b 0%, #0a6fb8 55%, #8cc63f 100%)
```
Use sparingly for: header underlines, active-tab indicators, section markers, hero accents.

---

## 2. Typography

- **Primary font:** `Inter`, then `Segoe UI`, `system-ui`, `-apple-system`, sans-serif
- **Headings:** bold→black weight (700–900), often `text-transform: uppercase` with `letter-spacing: 1–2px` for labels/eyebrows
- **Monospace (data/metrics):** `'JetBrains Mono', 'Cascadia Mono', 'Consolas', ui-monospace, monospace`
- **Brand wordmark:** "EPROM" set in heavy weight (900), wide letter-spacing (~2px), all caps

**Scale guidance**
| Role | Size | Weight |
|---|---|---|
| Page title / H1 | 21–28px | 800 |
| Section title (eyebrow) | 12–13px, uppercase, +1px tracking | 700 |
| Body | 14–15px | 400 |
| Caption / muted | 11–12px | 400–600 |
| Big metric (mono) | 28–32px | 800 |

---

## 3. Logo / Brand Mark

- Official logo: blue **EPROM** wordmark paired with a **lime green** leaf/flame accent.
- Asset on site: `https://eprom.com.eg/wp-content/uploads/2024/07/epromlogo-scaled.gif`
- **CSS-only fallback lockup** (no image needed):
```css
.brand-mark {
  font: 900 26px/1 'Inter', system-ui, sans-serif;
  letter-spacing: 2px; color: #00529b;
  padding: 9px 13px; border-radius: 4px;
  background: #fff; border: 2px solid #00529b; position: relative;
}
.brand-mark::after { /* lime corner accent echoing the logo leaf */
  content: ''; position: absolute; right: -1px; bottom: -1px;
  width: 14px; height: 14px; background: #8cc63f; border-radius: 0 0 3px 0;
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
}
```
- **Clear space:** keep at least the height of the "E" around the mark.
- **Don't:** recolor the wordmark, stretch it, or place blue on a low-contrast background.

---

## 4. Component Style Notes

- **Aesthetic:** modern industrial-corporate — clean, trustworthy, lots of white space, grid-based.
- **Corners:** small radii (3–4px) for an engineered, precise feel.
- **Shadows:** soft, blue-tinted: `0 1px 2px rgba(0,41,82,.07), 0 4px 14px rgba(0,41,82,.06)`
- **Buttons (primary):** solid `#00529b`, white text, hover → `#0a6fb8`.
- **Buttons (secondary):** white bg, `#00529b` border + text, hover fills blue.
- **Accent buttons / success:** `#8cc63f`, dark or white text.
- **Cards/panels:** white bg, `#d4dde8` border, soft shadow; optional left border in brand color.
- **Tabs/section headers:** underline or marker uses the **brand gradient**.
- **Links:** `#00529b`, hover `#3f82ff` or underline.

---

## 5. Chart / Data-Viz Palette

Ordered categorical palette (brand-first):
```
['#00529b', '#8cc63f', '#3f82ff', '#d99a1c', '#dc2626', '#16a085']
```
- Income / positive series → `#8cc63f`
- Expense / negative series → `#dc2626`
- Primary series → `#00529b`
- Always use `#ffffff` borders between doughnut/pie segments.

---

## 6. Ready-to-paste CSS variables

```css
:root {
  /* EPROM brand */
  --eprom-blue:        #00529b;  /* primary */
  --eprom-lime:        #8cc63f;  /* secondary accent */
  --eprom-blue-bright: #3f82ff;
  --eprom-blue-hover:  #0a6fb8;

  /* surfaces & text */
  --bg:            #eef2f7;
  --panel:         #ffffff;
  --panel-2:       #f3f6fa;
  --border:        #d4dde8;
  --border-bright: #b3c2d4;
  --text:          #0f2438;
  --muted:         #5a6f84;

  /* semantic */
  --green: #6aa81f;
  --amber: #d97706;
  --red:   #dc2626;
  --blue:  #00529b;

  /* roles */
  --accent:        #00529b;
  --accent-2:      #8cc63f;
  --accent-soft:   #e2edf8;
  --brand-grad:    linear-gradient(90deg, #00529b 0%, #0a6fb8 55%, #8cc63f 100%);
  --shadow:        0 1px 2px rgba(0,41,82,.07), 0 4px 14px rgba(0,41,82,.06);

  /* type */
  --font-sans: 'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Cascadia Mono', 'Consolas', ui-monospace, monospace;
}
```

### Tailwind config snippet
```js
// tailwind.config.js → theme.extend
colors: {
  eprom: {
    blue:   '#00529b',
    lime:   '#8cc63f',
    bright: '#3f82ff',
    hover:  '#0a6fb8',
    ink:    '#0f2438',
    muted:  '#5a6f84',
    bg:     '#eef2f7',
    panel:  '#ffffff',
    border: '#d4dde8',
  },
},
fontFamily: {
  sans: ['Inter', 'Segoe UI', 'system-ui', 'sans-serif'],
  mono: ['JetBrains Mono', 'Cascadia Mono', 'Consolas', 'monospace'],
},
backgroundImage: {
  'eprom-grad': 'linear-gradient(90deg, #00529b 0%, #0a6fb8 55%, #8cc63f 100%)',
},
```

### Design tokens (JSON)
```json
{
  "color": {
    "brand": { "blue": "#00529b", "lime": "#8cc63f", "bright": "#3f82ff", "hover": "#0a6fb8" },
    "text":  { "default": "#0f2438", "muted": "#5a6f84" },
    "surface": { "bg": "#eef2f7", "panel": "#ffffff", "panel2": "#f3f6fa" },
    "border": { "default": "#d4dde8", "bright": "#b3c2d4" },
    "status": { "success": "#6aa81f", "warning": "#d97706", "danger": "#dc2626", "info": "#00529b" }
  },
  "font": {
    "sans": "Inter, 'Segoe UI', system-ui, sans-serif",
    "mono": "'JetBrains Mono', 'Cascadia Mono', Consolas, monospace"
  },
  "radius": { "sm": "3px", "md": "4px" },
  "shadow": "0 1px 2px rgba(0,41,82,.07), 0 4px 14px rgba(0,41,82,.06)"
}
```

---

## 7. Quick accessibility notes
- `#00529b` on `#ffffff` → contrast ≈ 8.6:1 ✅ (AAA for normal text).
- `#8cc63f` is a **light** green — do **not** use as text on white (fails contrast). Use it for fills, borders, icons, and large accents; pair text with `#0f2438` or use the darker `#6aa81f` for green text.
- Keep body text at `#0f2438` / `#5a6f84` for safe contrast.

---

*Source: colors extracted directly from eprom.com.eg stylesheets (Salient theme). Reuse this file as the brand spec for future EPROM-styled projects.*
