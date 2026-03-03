import { beforeEach, describe, expect, it } from "vitest"
import { applyNeuro } from "../src/neuro/apply"
import { NEURO_DEFAULTS } from "../src/neuro/defaults"
import type { NeuroConfig } from "../src/types"

describe("applyNeuro", () => {
	let root: HTMLElement

	beforeEach(() => {
		root = document.documentElement
		root.className = ""
	})

	it("enables focus highlight", () => {
		applyNeuro({ ...NEURO_DEFAULTS, focusHighlight: true })
		expect(root.classList.contains("neuro-focus")).toBe(true)
	})

	it("disables focus highlight", () => {
		applyNeuro({ ...NEURO_DEFAULTS, focusHighlight: true })
		applyNeuro({ ...NEURO_DEFAULTS, focusHighlight: false })
		expect(root.classList.contains("neuro-focus")).toBe(false)
	})

	it("enables reading mode", () => {
		applyNeuro({ ...NEURO_DEFAULTS, readingMode: true })
		expect(root.classList.contains("neuro-reading")).toBe(true)
	})

	it("enables wide spacing", () => {
		applyNeuro({ ...NEURO_DEFAULTS, spacing: "wide" })
		expect(root.classList.contains("neuro-spacing-wide")).toBe(true)
	})

	it("disables spacing when set back to normal", () => {
		applyNeuro({ ...NEURO_DEFAULTS, spacing: "wide" })
		applyNeuro({ ...NEURO_DEFAULTS, spacing: "normal" })
		expect(root.classList.contains("neuro-spacing-wide")).toBe(false)
	})

	it("enables left text alignment", () => {
		applyNeuro({ ...NEURO_DEFAULTS, textAlign: "left" })
		expect(root.classList.contains("neuro-text-left")).toBe(true)
	})

	it("enables reduced motion", () => {
		applyNeuro({ ...NEURO_DEFAULTS, reducedMotion: true })
		expect(root.classList.contains("neuro-reduced-motion")).toBe(true)
	})

	it("applies OpenDyslexic font", () => {
		applyNeuro({ ...NEURO_DEFAULTS, fontFamily: "dyslexia" })
		expect(root.classList.contains("neuro-font-dyslexia")).toBe(true)
	})

	it("applies Lexend font", () => {
		applyNeuro({ ...NEURO_DEFAULTS, fontFamily: "lexend" })
		expect(root.classList.contains("neuro-font-lexend")).toBe(true)
	})

	it("applies Atkinson font", () => {
		applyNeuro({ ...NEURO_DEFAULTS, fontFamily: "atkinson" })
		expect(root.classList.contains("neuro-font-atkinson")).toBe(true)
	})

	it("removes previous font class when switching", () => {
		applyNeuro({ ...NEURO_DEFAULTS, fontFamily: "dyslexia" })
		applyNeuro({ ...NEURO_DEFAULTS, fontFamily: "lexend" })
		expect(root.classList.contains("neuro-font-dyslexia")).toBe(false)
		expect(root.classList.contains("neuro-font-lexend")).toBe(true)
	})

	it("removes all font classes when set to default", () => {
		applyNeuro({ ...NEURO_DEFAULTS, fontFamily: "lexend" })
		applyNeuro({ ...NEURO_DEFAULTS, fontFamily: "default" })
		expect(root.classList.contains("neuro-font-lexend")).toBe(false)
		expect(root.classList.contains("neuro-font-dyslexia")).toBe(false)
		expect(root.classList.contains("neuro-font-atkinson")).toBe(false)
	})

	it("delegates to preset when provided", () => {
		const calls: NeuroConfig[] = []
		const preset = {
			applyA11y: () => {},
			applyNeuro: (c: NeuroConfig) => calls.push(c),
		}
		const config = { ...NEURO_DEFAULTS, focusHighlight: true }
		applyNeuro(config, preset)
		expect(calls).toHaveLength(1)
		expect(calls[0].focusHighlight).toBe(true)
		expect(root.classList.contains("neuro-focus")).toBe(false)
	})
})
