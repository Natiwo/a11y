export type ContrastMode = "default" | "high" | "low" | "sepia"
export type ColorBlindMode = "default" | "protanopia" | "deuteranopia" | "tritanopia"
export type CursorSize = "default" | "large" | "xlarge"
export type SpacingMode = "normal" | "wide"
export type FontFamily = "default" | "dyslexia" | "lexend" | "atkinson"
export type TextAlign = "default" | "left"

export type A11yConfig = {
	fontSize: number
	contrastMode: ContrastMode
	colorBlindMode: ColorBlindMode
	cursorSize: CursorSize
	reducedMotion: boolean
}

export type NeuroConfig = {
	focusHighlight: boolean
	readingMode: boolean
	readingRuler: boolean
	spacing: SpacingMode
	fontFamily: FontFamily
	textAlign: TextAlign
	reducedMotion: boolean
}

export type Preset = {
	applyA11y: (config: A11yConfig) => void
	applyNeuro: (config: NeuroConfig) => void
	cleanup?: () => void
}

export type StorageAdapter = {
	get: <T>(key: string) => T | null
	set: <T>(key: string, value: T) => void
}
