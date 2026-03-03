import type { A11yConfig, Preset } from "../types"

const CONTRAST_CLASSES = ["a11y-high", "a11y-low", "a11y-sepia"] as const
const CVD_CLASSES = ["a11y-cvd-protanopia", "a11y-cvd-deuteranopia", "a11y-cvd-tritanopia"] as const
const CURSOR_CLASSES = ["a11y-cursor-large", "a11y-cursor-xlarge"] as const

export function applyA11y(config: A11yConfig, preset?: Preset) {
	if (preset) {
		preset.applyA11y(config)
		return
	}
	const root = document.documentElement
	root.style.setProperty("--a11y-font-size", `${config.fontSize}px`)

	root.classList.remove(...CONTRAST_CLASSES)
	if (config.contrastMode !== "default") {
		root.classList.add(`a11y-${config.contrastMode}`)
	}

	root.classList.remove(...CVD_CLASSES)
	if (config.colorBlindMode !== "default") {
		root.classList.add(`a11y-cvd-${config.colorBlindMode}`)
	}

	root.classList.remove(...CURSOR_CLASSES)
	if (config.cursorSize !== "default") {
		root.classList.add(`a11y-cursor-${config.cursorSize}`)
	}

	root.classList.toggle("a11y-reduced-motion", config.reducedMotion)
}
