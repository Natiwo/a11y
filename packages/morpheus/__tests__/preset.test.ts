import { A11Y_DEFAULTS, NEURO_DEFAULTS } from "@natiwo/a11y"
import { beforeEach, describe, expect, it } from "vitest"
import { morpheusPreset } from "../src/preset"

describe("morpheusPreset", () => {
	beforeEach(() => {
		document.documentElement.className = ""
		document.documentElement.style.cssText = ""
	})

	describe("applyA11y", () => {
		it("sets font size CSS variable", () => {
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, fontSize: 20 })
			expect(document.documentElement.style.getPropertyValue("--a11y-font-size")).toBe("20px")
		})

		it("applies contrast class", () => {
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, contrastMode: "high" })
			expect(document.documentElement.classList.contains("a11y-high")).toBe(true)
		})

		it("removes previous contrast class when switching", () => {
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, contrastMode: "high" })
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, contrastMode: "sepia" })
			expect(document.documentElement.classList.contains("a11y-high")).toBe(false)
			expect(document.documentElement.classList.contains("a11y-sepia")).toBe(true)
		})

		it("applies color blind mode class", () => {
			morpheusPreset.applyA11y({
				...A11Y_DEFAULTS,
				colorBlindMode: "protanopia",
			})
			expect(document.documentElement.classList.contains("a11y-cvd-protanopia")).toBe(true)
		})

		it("removes previous color blind class when switching", () => {
			morpheusPreset.applyA11y({
				...A11Y_DEFAULTS,
				colorBlindMode: "protanopia",
			})
			morpheusPreset.applyA11y({
				...A11Y_DEFAULTS,
				colorBlindMode: "deuteranopia",
			})
			expect(document.documentElement.classList.contains("a11y-cvd-protanopia")).toBe(false)
			expect(document.documentElement.classList.contains("a11y-cvd-deuteranopia")).toBe(true)
		})

		it("applies cursor size class", () => {
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, cursorSize: "large" })
			expect(document.documentElement.classList.contains("a11y-cursor-large")).toBe(true)
		})

		it("applies xlarge cursor size", () => {
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, cursorSize: "xlarge" })
			expect(document.documentElement.classList.contains("a11y-cursor-xlarge")).toBe(true)
		})

		it("removes previous cursor class when switching", () => {
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, cursorSize: "large" })
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, cursorSize: "xlarge" })
			expect(document.documentElement.classList.contains("a11y-cursor-large")).toBe(false)
			expect(document.documentElement.classList.contains("a11y-cursor-xlarge")).toBe(true)
		})

		it("toggles reduced motion class", () => {
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, reducedMotion: true })
			expect(document.documentElement.classList.contains("a11y-reduced-motion")).toBe(true)
		})

		it("removes reduced motion class when false", () => {
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, reducedMotion: true })
			morpheusPreset.applyA11y({ ...A11Y_DEFAULTS, reducedMotion: false })
			expect(document.documentElement.classList.contains("a11y-reduced-motion")).toBe(false)
		})

		it("removes all classes on default config", () => {
			morpheusPreset.applyA11y({
				...A11Y_DEFAULTS,
				contrastMode: "high",
				colorBlindMode: "tritanopia",
				cursorSize: "large",
				reducedMotion: true,
			})
			morpheusPreset.applyA11y(A11Y_DEFAULTS)
			expect(document.documentElement.className).toBe("")
		})
	})

	describe("applyNeuro", () => {
		it("toggles focus highlight class", () => {
			morpheusPreset.applyNeuro({
				...NEURO_DEFAULTS,
				focusHighlight: true,
			})
			expect(document.documentElement.classList.contains("neuro-focus")).toBe(true)
		})

		it("toggles reading mode class", () => {
			morpheusPreset.applyNeuro({ ...NEURO_DEFAULTS, readingMode: true })
			expect(document.documentElement.classList.contains("neuro-reading")).toBe(true)
		})

		it("applies spacing class", () => {
			morpheusPreset.applyNeuro({ ...NEURO_DEFAULTS, spacing: "wide" })
			expect(document.documentElement.classList.contains("neuro-spacing-wide")).toBe(true)
		})

		it("applies font family dyslexia", () => {
			morpheusPreset.applyNeuro({
				...NEURO_DEFAULTS,
				fontFamily: "dyslexia",
			})
			expect(document.documentElement.classList.contains("neuro-font-dyslexia")).toBe(true)
		})

		it("applies font family lexend", () => {
			morpheusPreset.applyNeuro({ ...NEURO_DEFAULTS, fontFamily: "lexend" })
			expect(document.documentElement.classList.contains("neuro-font-lexend")).toBe(true)
		})

		it("applies font family atkinson", () => {
			morpheusPreset.applyNeuro({
				...NEURO_DEFAULTS,
				fontFamily: "atkinson",
			})
			expect(document.documentElement.classList.contains("neuro-font-atkinson")).toBe(true)
		})

		it("applies text align class", () => {
			morpheusPreset.applyNeuro({ ...NEURO_DEFAULTS, textAlign: "left" })
			expect(document.documentElement.classList.contains("neuro-text-left")).toBe(true)
		})

		it("toggles reduced motion class", () => {
			morpheusPreset.applyNeuro({
				...NEURO_DEFAULTS,
				reducedMotion: true,
			})
			expect(document.documentElement.classList.contains("neuro-reduced-motion")).toBe(true)
		})

		it("removes previous font class when switching", () => {
			morpheusPreset.applyNeuro({
				...NEURO_DEFAULTS,
				fontFamily: "dyslexia",
			})
			morpheusPreset.applyNeuro({
				...NEURO_DEFAULTS,
				fontFamily: "lexend",
			})
			expect(document.documentElement.classList.contains("neuro-font-dyslexia")).toBe(false)
			expect(document.documentElement.classList.contains("neuro-font-lexend")).toBe(true)
		})

		it("removes all neuro classes on default config", () => {
			morpheusPreset.applyNeuro({
				...NEURO_DEFAULTS,
				focusHighlight: true,
				readingMode: true,
				spacing: "wide",
				fontFamily: "atkinson",
				textAlign: "left",
				reducedMotion: true,
			})
			morpheusPreset.applyNeuro(NEURO_DEFAULTS)
			expect(document.documentElement.className).toBe("")
		})
	})
})
