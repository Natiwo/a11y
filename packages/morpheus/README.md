# @natiwo/a11y-morpheus

**Morpheus Design System preset for @natiwo/a11y.**

Maps accessibility and neurodiversity configurations to Morpheus Design System CSS classes. Use this preset when building interfaces with the Morpheus neumorphic design system.

## Install

```bash
npm install @natiwo/a11y @natiwo/a11y-morpheus
```

## Usage

### With React

```tsx
import { useA11y, useNeuro } from "@natiwo/a11y-react"
import { morpheusPreset } from "@natiwo/a11y-morpheus"

function App() {
  const a11y = useA11y({ preset: morpheusPreset })
  const neuro = useNeuro({ preset: morpheusPreset })
  // ...
}
```

### Vanilla JS

```ts
import { applyA11y, applyNeuro, A11Y_DEFAULTS, NEURO_DEFAULTS } from "@natiwo/a11y"
import { morpheusPreset } from "@natiwo/a11y-morpheus"

applyA11y(A11Y_DEFAULTS, morpheusPreset)
applyNeuro(NEURO_DEFAULTS, morpheusPreset)
```

## CSS Classes Applied

### Accessibility (applyA11y)

| Config | CSS Effect |
|--------|------------|
| `fontSize` | Sets `--a11y-font-size` CSS variable |
| `contrastMode: "high"` | Adds `a11y-high` class |
| `contrastMode: "low"` | Adds `a11y-low` class |
| `contrastMode: "sepia"` | Adds `a11y-sepia` class |
| `colorBlindMode: "protanopia"` | Adds `a11y-cvd-protanopia` class |
| `colorBlindMode: "deuteranopia"` | Adds `a11y-cvd-deuteranopia` class |
| `colorBlindMode: "tritanopia"` | Adds `a11y-cvd-tritanopia` class |
| `cursorSize: "large"` | Adds `a11y-cursor-large` class |
| `cursorSize: "xlarge"` | Adds `a11y-cursor-xlarge` class |
| `reducedMotion: true` | Adds `a11y-reduced-motion` class |

### Neurodiversity (applyNeuro)

| Config | CSS Effect |
|--------|------------|
| `focusHighlight: true` | Adds `neuro-focus` class |
| `readingMode: true` | Adds `neuro-reading` class |
| `spacing: "wide"` | Adds `neuro-spacing-wide` class |
| `fontFamily: "dyslexia"` | Adds `neuro-font-dyslexia` class |
| `fontFamily: "lexend"` | Adds `neuro-font-lexend` class |
| `fontFamily: "atkinson"` | Adds `neuro-font-atkinson` class |
| `textAlign: "left"` | Adds `neuro-text-left` class |
| `reducedMotion: true` | Adds `neuro-reduced-motion` class |

All classes are applied to `document.documentElement` (`<html>`). Define the corresponding CSS rules in your stylesheet.

## Creating Your Own Preset

See the [root README](../../README.md#creating-a-custom-preset) for how to implement the `Preset` interface for your own design system.

## License

[MIT](../../LICENSE) © [Natiwo](https://natiwo.com.br)
