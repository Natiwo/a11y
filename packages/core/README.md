# @natiwo/a11y

**Headless accessibility and neurodiversity toolkit for the web.**

Framework-agnostic core with types, defaults, apply functions, and a pluggable storage adapter. Zero dependencies. Works with any framework or vanilla JS.

## Install

```bash
npm install @natiwo/a11y
```

## API

### Types

```ts
type A11yConfig = {
  fontSize: number          // 12-24
  contrastMode: ContrastMode // "default" | "high" | "low" | "sepia"
  colorBlindMode: ColorBlindMode // "default" | "protanopia" | "deuteranopia" | "tritanopia"
  cursorSize: CursorSize    // "default" | "large" | "xlarge"
  reducedMotion: boolean
}

type NeuroConfig = {
  focusHighlight: boolean
  readingMode: boolean
  readingRuler: boolean
  spacing: SpacingMode      // "normal" | "wide"
  fontFamily: FontFamily    // "default" | "dyslexia" | "lexend" | "atkinson"
  textAlign: TextAlign      // "default" | "left"
  reducedMotion: boolean
}

type Preset = {
  applyA11y: (config: A11yConfig) => void
  applyNeuro: (config: NeuroConfig) => void
  cleanup?: () => void
}

type StorageAdapter = {
  get: <T>(key: string) => T | null
  set: <T>(key: string, value: T) => void
}
```

### Functions

#### `applyA11y(config: A11yConfig, preset?: Preset): void`

Applies accessibility settings to the DOM. If a preset is provided, delegates to `preset.applyA11y()`. Otherwise, applies default CSS classes to `document.documentElement`.

#### `applyNeuro(config: NeuroConfig, preset?: Preset): void`

Applies neurodiversity settings to the DOM. If a preset is provided, delegates to `preset.applyNeuro()`. Otherwise, applies default CSS classes to `document.documentElement`.

#### `localStorageAdapter: StorageAdapter`

Default storage adapter using `localStorage` with JSON serialization. Silently handles errors (storage full, unavailable).

### Constants

- `A11Y_DEFAULTS` — Default A11yConfig values
- `A11Y_STORAGE_KEY` — `"@natiwo/a11y"` storage key
- `NEURO_DEFAULTS` — Default NeuroConfig values
- `NEURO_STORAGE_KEY` — `"@natiwo/neuro"` storage key

## Custom Storage

```ts
import type { StorageAdapter } from "@natiwo/a11y"

const sessionStorageAdapter: StorageAdapter = {
  get: <T>(key: string): T | null => {
    const raw = sessionStorage.getItem(key)
    return raw ? JSON.parse(raw) : null
  },
  set: <T>(key: string, value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value))
  },
}
```

## Why these features?

See the [root README](../../README.md#why-these-features) for the full WCAG 2.2 rationale behind each feature.

## License

[MIT](../../LICENSE) © [Natiwo](https://natiwo.com.br)
