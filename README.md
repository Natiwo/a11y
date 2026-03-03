# @natiwo/a11y

**Headless accessibility and neurodiversity primitives for the web.**

[![CI](https://github.com/natiwo/a11y/actions/workflows/ci.yml/badge.svg)](https://github.com/natiwo/a11y/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/@natiwo/a11y)](https://www.npmjs.com/package/@natiwo/a11y)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Our Commitment

This project exists because accessibility is not a feature, it is a right.

I am neurodivergent. I build software every day knowing that the tools I use were not
designed for minds like mine. Screens that flash, text that blurs together, interfaces
that demand a type of attention my brain does not produce, these are not minor
inconveniences. They are barriers.

@natiwo/a11y was born from the belief that every person, regardless of how they see,
move, think, or process the world, deserves software that adapts to them, not the
other way around.

This library supports people with:
- **Visual impairments** — low vision, color blindness, photophobia, contrast sensitivity
- **Motor disabilities** — limited fine motor control, tremors, alternative input devices
- **Cognitive and neurological differences** — dyslexia, ADHD, autism spectrum, vestibular disorders, sensory processing sensitivity
- **Situational limitations** — bright sunlight, noisy environments, temporary injuries, aging

We follow WCAG 2.2 guidelines not as a checkbox, but as a baseline. Real inclusion
goes beyond compliance. It requires understanding the biology behind the barriers and
building tools that respect human variability.

If you are neurodivergent, disabled, or simply someone who has ever felt excluded by
a digital interface, this project is for you. Your experience matters. Your feedback
shapes this library.

[Claudiomar Estevam](https://www.linkedin.com/in/claudioeestevam/), creator of @natiwo/a11y

## Packages

| Package | Description | npm |
|---------|-------------|-----|
| [`@natiwo/a11y`](packages/core) | Framework-agnostic core (types, defaults, apply, storage) | [![npm](https://img.shields.io/npm/v/@natiwo/a11y)](https://www.npmjs.com/package/@natiwo/a11y) |
| [`@natiwo/a11y-react`](packages/react) | React hooks (`useA11y`, `useNeuro`) | [![npm](https://img.shields.io/npm/v/@natiwo/a11y-react)](https://www.npmjs.com/package/@natiwo/a11y-react) |
| [`@natiwo/a11y-morpheus`](packages/morpheus) | Morpheus Design System preset | [![npm](https://img.shields.io/npm/v/@natiwo/a11y-morpheus)](https://www.npmjs.com/package/@natiwo/a11y-morpheus) |

## Why These Features?

Every feature in this library is grounded in WCAG 2.2 guidelines and scientific research on human perception and cognition.

| Feature | Config | WCAG / Research Basis |
|---------|--------|----------------------|
| **Font size scaling** | `fontSize: 12-24` | WCAG 1.4.4 — content must scale to 200% without loss. Base 16px (1rem) is optimal for readability. |
| **Contrast modes** | `contrastMode` | WCAG 1.4.3 — minimum 4.5:1 ratio (AA), 7:1 (AAA). High contrast (#000/#FF0 = 21:1) for severe low vision. Sepia (#F4ECD8/#5B4636 = 7.5:1) for prolonged reading comfort. Low contrast (#F0F0F0/#333 = 12.6:1) for photophobia. |
| **Color blind filters** | `colorBlindMode` | SVG feColorMatrix correction for protanopia (red), deuteranopia (green), tritanopia (blue). Affects ~8% of males. Matrices remap lost color channels to functional ones. |
| **Cursor size** | `cursorSize` | Enhanced pointer trackability for low vision. 32px/64px with high-contrast outlines. |
| **Reduced motion** | `reducedMotion` | WCAG 2.3.3 — vestibular disorders, sensory sensitivity. Disables CSS transitions/animations. Respects `prefers-reduced-motion` OS setting. |
| **Focus highlight** | `focusHighlight` | WCAG 2.4.11/2.4.12 (new in 2.2) — focused element must not be obscured. Indicator must have 3:1 contrast. |
| **Reading mode** | `readingMode` | Cognitive load reduction for neurodivergent users (ASD, ADHD). Simplifies visual hierarchy. |
| **Reading ruler** | `readingRuler` | Mitigates "line skipping" for dyslexia/ADHD. Horizontal guide follows cursor position. |
| **Spacing** | `spacing: "wide"` | WCAG 1.4.12 — line-height >= 1.5x, paragraph spacing >= 2x, letter-spacing >= 0.12x, word-spacing >= 0.16x font size. |
| **Font family** | `fontFamily` | **OpenDyslexic**: heavy bases prevent mental rotation. **Lexend**: variable spacing reduces visual stress. **Atkinson Hyperlegible**: maximum distinction between similar characters (l, I, 1). |
| **Text alignment** | `textAlign: "left"` | Justified text creates irregular word spacing that disrupts eye tracking for dyslexia/ADHD. Left-aligned ("ragged right") improves next-line location. |

## Quick Start

### Vanilla (framework-agnostic)

```bash
npm install @natiwo/a11y
```

```ts
import { applyA11y, A11Y_DEFAULTS, localStorageAdapter } from "@natiwo/a11y"

// Load saved preferences or use defaults
const saved = localStorageAdapter.get("@natiwo/a11y")
const config = saved ? { ...A11Y_DEFAULTS, ...saved } : A11Y_DEFAULTS

// Apply to DOM
applyA11y(config)
```

### React

```bash
npm install @natiwo/a11y @natiwo/a11y-react
```

```tsx
import { useA11y, useNeuro } from "@natiwo/a11y-react"

function AccessibilityPanel() {
  const a11y = useA11y()
  const neuro = useNeuro()

  return (
    <div>
      <button onClick={() => a11y.setFontSize(a11y.fontSize + 2)}>
        Increase Font Size
      </button>
      <button onClick={() => a11y.setContrastMode("high")}>
        High Contrast
      </button>
      <button onClick={() => neuro.setFontFamily("dyslexia")}>
        Dyslexia Font
      </button>
    </div>
  )
}
```

### With a Design System Preset

```bash
npm install @natiwo/a11y @natiwo/a11y-react @natiwo/a11y-morpheus
```

```tsx
import { useA11y } from "@natiwo/a11y-react"
import { morpheusPreset } from "@natiwo/a11y-morpheus"

function App() {
  const a11y = useA11y({ preset: morpheusPreset })
  // morpheusPreset applies Morpheus Design System CSS classes
}
```

## Creating a Custom Preset

Implement the `Preset` interface to integrate with any design system:

```ts
import type { Preset } from "@natiwo/a11y"

export const myPreset: Preset = {
  applyA11y(config) {
    const root = document.documentElement
    root.style.setProperty("--font-size", `${config.fontSize}px`)
    root.classList.toggle("high-contrast", config.contrastMode === "high")
    // ... map other config properties to your CSS classes
  },
  applyNeuro(config) {
    const root = document.documentElement
    root.classList.toggle("focus-highlight", config.focusHighlight)
    root.classList.toggle("wide-spacing", config.spacing === "wide")
    // ... map neuro config to your CSS classes
  },
}
```

## Architecture

```
@natiwo/a11y (core)
├── types       → A11yConfig, NeuroConfig, Preset, StorageAdapter
├── storage     → localStorageAdapter (default impl)
├── a11y        → applyA11y(), A11Y_DEFAULTS
└── neuro       → applyNeuro(), NEURO_DEFAULTS

@natiwo/a11y-react
├── use-a11y    → useA11y(options) hook
└── use-neuro   → useNeuro(options) hook

@natiwo/a11y-morpheus
└── preset      → morpheusPreset (CSS classes for Morpheus Design System)
```

Dependency graph:
```
a11y-react ──depends──→ a11y (core)
a11y-morpheus ──depends──→ a11y (core)
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a pull request.

```bash
# Clone and install
git clone https://github.com/natiwo/a11y.git
cd a11y
pnpm install

# Run all checks
pnpm turbo run lint typecheck build test

# Run tests in watch mode
pnpm vitest
```

## License

[MIT](LICENSE) © [Natiwo](https://natiwo.com.br)
