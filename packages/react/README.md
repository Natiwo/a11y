# @natiwo/a11y-react

**React hooks for @natiwo/a11y — accessibility and neurodiversity.**

Wraps the framework-agnostic core with React hooks that handle state, persistence, and DOM application automatically.

## Install

```bash
npm install @natiwo/a11y @natiwo/a11y-react
```

## Hooks

### `useA11y(options?)`

```ts
import { useA11y } from "@natiwo/a11y-react"

const a11y = useA11y()

// Read state
a11y.fontSize        // number (12-24)
a11y.contrastMode    // "default" | "high" | "low" | "sepia"
a11y.colorBlindMode  // "default" | "protanopia" | "deuteranopia" | "tritanopia"
a11y.cursorSize      // "default" | "large" | "xlarge"
a11y.reducedMotion   // boolean

// Update state
a11y.setFontSize(18)
a11y.setContrastMode("high")
a11y.setColorBlindMode("protanopia")
a11y.setCursorSize("large")
a11y.toggleReducedMotion()
a11y.reset()
```

### `useNeuro(options?)`

```ts
import { useNeuro } from "@natiwo/a11y-react"

const neuro = useNeuro()

// Read state
neuro.focusHighlight  // boolean
neuro.readingMode     // boolean
neuro.readingRuler    // boolean
neuro.spacing         // "normal" | "wide"
neuro.fontFamily      // "default" | "dyslexia" | "lexend" | "atkinson"
neuro.textAlign       // "default" | "left"
neuro.reducedMotion   // boolean

// Update state
neuro.toggleFocusHighlight()
neuro.toggleReadingMode()
neuro.toggleReadingRuler()
neuro.setSpacing("wide")
neuro.setFontFamily("dyslexia")
neuro.setTextAlign("left")
neuro.toggleReducedMotion()
neuro.reset()
```

### Options

Both hooks accept an optional options object:

```ts
import { useA11y } from "@natiwo/a11y-react"
import { morpheusPreset } from "@natiwo/a11y-morpheus"

const a11y = useA11y({
  preset: morpheusPreset,   // Custom preset (default: built-in CSS classes)
  storage: myStorageAdapter, // Custom storage (default: localStorage)
})
```

## Type Re-exports

For convenience, all core types are re-exported:

```ts
import type {
  A11yConfig,
  NeuroConfig,
  Preset,
  StorageAdapter,
  ContrastMode,
  ColorBlindMode,
  CursorSize,
  SpacingMode,
  FontFamily,
  TextAlign,
} from "@natiwo/a11y-react"
```

## Why these features?

See the [root README](../../README.md#why-these-features) for the full WCAG 2.2 rationale behind each feature.

## License

[MIT](../../LICENSE) © [Natiwo](https://natiwo.com.br)
