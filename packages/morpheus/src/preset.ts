import type { Preset } from "@natiwo/a11y"

const A11Y_CONTRAST_CLASSES = ["a11y-high", "a11y-low", "a11y-sepia"] as const
const A11Y_CVD_CLASSES = [
	"a11y-cvd-protanopia",
	"a11y-cvd-deuteranopia",
	"a11y-cvd-tritanopia",
] as const
const A11Y_CURSOR_CLASSES = ["a11y-cursor-large", "a11y-cursor-xlarge"] as const
const NEURO_FONT_CLASSES = [
	"neuro-font-dyslexia",
	"neuro-font-lexend",
	"neuro-font-atkinson",
] as const

export const morpheusPreset: Preset = {
	applyA11y(config) {
		const root = document.documentElement
		root.style.setProperty("--a11y-font-size", `${config.fontSize}px`)

		root.classList.remove(...A11Y_CONTRAST_CLASSES)
		if (config.contrastMode !== "default") {
			root.classList.add(`a11y-${config.contrastMode}`)
		}

		root.classList.remove(...A11Y_CVD_CLASSES)
		if (config.colorBlindMode !== "default") {
			root.classList.add(`a11y-cvd-${config.colorBlindMode}`)
		}

		root.classList.remove(...A11Y_CURSOR_CLASSES)
		if (config.cursorSize !== "default") {
			root.classList.add(`a11y-cursor-${config.cursorSize}`)
		}

		root.classList.toggle("a11y-reduced-motion", config.reducedMotion)
	},
	applyNeuro(config) {
		const root = document.documentElement
		root.classList.toggle("neuro-focus", config.focusHighlight)
		root.classList.toggle("neuro-reading", config.readingMode)
		root.classList.toggle("neuro-spacing-wide", config.spacing === "wide")
		root.classList.toggle("neuro-text-left", config.textAlign === "left")
		root.classList.toggle("neuro-reduced-motion", config.reducedMotion)

		root.classList.remove(...NEURO_FONT_CLASSES)
		if (config.fontFamily !== "default") {
			root.classList.add(`neuro-font-${config.fontFamily}`)
		}
	},
}
