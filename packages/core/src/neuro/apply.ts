import type { NeuroConfig, Preset } from "../types"

const FONT_CLASSES = ["neuro-font-dyslexia", "neuro-font-lexend", "neuro-font-atkinson"] as const

export function applyNeuro(config: NeuroConfig, preset?: Preset) {
	if (preset) {
		preset.applyNeuro(config)
		return
	}
	const root = document.documentElement
	root.classList.toggle("neuro-focus", config.focusHighlight)
	root.classList.toggle("neuro-reading", config.readingMode)
	root.classList.toggle("neuro-spacing-wide", config.spacing === "wide")
	root.classList.toggle("neuro-text-left", config.textAlign === "left")
	root.classList.toggle("neuro-reduced-motion", config.reducedMotion)

	root.classList.remove(...FONT_CLASSES)
	if (config.fontFamily !== "default") {
		root.classList.add(`neuro-font-${config.fontFamily}`)
	}
}
