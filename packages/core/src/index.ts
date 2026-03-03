// Apply (vanilla — direct DOM manipulation)
export { applyA11y } from "./a11y/apply"

// Defaults
export { A11Y_DEFAULTS, A11Y_STORAGE_KEY } from "./a11y/defaults"

export { applyNeuro } from "./neuro/apply"
export { NEURO_DEFAULTS, NEURO_STORAGE_KEY } from "./neuro/defaults"

// Storage
export { localStorageAdapter } from "./storage"

// Types
export type {
	A11yConfig,
	ColorBlindMode,
	ContrastMode,
	CursorSize,
	FontFamily,
	NeuroConfig,
	Preset,
	SpacingMode,
	StorageAdapter,
	TextAlign,
} from "./types"
