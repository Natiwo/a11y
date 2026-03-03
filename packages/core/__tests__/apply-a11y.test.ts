import { beforeEach, describe, expect, it } from "vitest"
import { applyA11y } from "../src/a11y/apply"
import { A11Y_DEFAULTS } from "../src/a11y/defaults"
import type { A11yConfig } from "../src/types"

describe("applyA11y", () => {
	let root: HTMLElement

	beforeEach(() => {
		root = document.documentElement
		root.className = ""
		root.style.cssText = ""
	})

	it("applies font-size as CSS variable", () => {
		applyA11y({ ...A11Y_DEFAULTS, fontSize: 20 })
		expect(root.style.getPropertyValue("--a11y-font-size")).toBe("20px")
	})

	it("applies high contrast class", () => {
		applyA11y({ ...A11Y_DEFAULTS, contrastMode: "high" })
		expect(root.classList.contains("a11y-high")).toBe(true)
	})

	it("applies low contrast class", () => {
		applyA11y({ ...A11Y_DEFAULTS, contrastMode: "low" })
		expect(root.classList.contains("a11y-low")).toBe(true)
	})

	it("applies sepia class", () => {
		applyA11y({ ...A11Y_DEFAULTS, contrastMode: "sepia" })
		expect(root.classList.contains("a11y-sepia")).toBe(true)
	})

	it("removes previous class when switching contrast mode", () => {
		applyA11y({ ...A11Y_DEFAULTS, contrastMode: "high" })
		applyA11y({ ...A11Y_DEFAULTS, contrastMode: "low" })
		expect(root.classList.contains("a11y-high")).toBe(false)
		expect(root.classList.contains("a11y-low")).toBe(true)
	})

	it("removes all contrast classes when set to default", () => {
		applyA11y({ ...A11Y_DEFAULTS, contrastMode: "high" })
		applyA11y({ ...A11Y_DEFAULTS, contrastMode: "default" })
		expect(root.classList.contains("a11y-high")).toBe(false)
		expect(root.classList.contains("a11y-low")).toBe(false)
		expect(root.classList.contains("a11y-sepia")).toBe(false)
	})

	it("applies protanopia color-blind filter", () => {
		applyA11y({ ...A11Y_DEFAULTS, colorBlindMode: "protanopia" })
		expect(root.classList.contains("a11y-cvd-protanopia")).toBe(true)
	})

	it("applies deuteranopia color-blind filter", () => {
		applyA11y({ ...A11Y_DEFAULTS, colorBlindMode: "deuteranopia" })
		expect(root.classList.contains("a11y-cvd-deuteranopia")).toBe(true)
	})

	it("applies tritanopia color-blind filter", () => {
		applyA11y({ ...A11Y_DEFAULTS, colorBlindMode: "tritanopia" })
		expect(root.classList.contains("a11y-cvd-tritanopia")).toBe(true)
	})

	it("removes previous filter when switching color-blind mode", () => {
		applyA11y({ ...A11Y_DEFAULTS, colorBlindMode: "protanopia" })
		applyA11y({ ...A11Y_DEFAULTS, colorBlindMode: "deuteranopia" })
		expect(root.classList.contains("a11y-cvd-protanopia")).toBe(false)
		expect(root.classList.contains("a11y-cvd-deuteranopia")).toBe(true)
	})

	it("applies large cursor", () => {
		applyA11y({ ...A11Y_DEFAULTS, cursorSize: "large" })
		expect(root.classList.contains("a11y-cursor-large")).toBe(true)
	})

	it("applies extra-large cursor", () => {
		applyA11y({ ...A11Y_DEFAULTS, cursorSize: "xlarge" })
		expect(root.classList.contains("a11y-cursor-xlarge")).toBe(true)
	})

	it("enables reduced motion", () => {
		applyA11y({ ...A11Y_DEFAULTS, reducedMotion: true })
		expect(root.classList.contains("a11y-reduced-motion")).toBe(true)
	})

	it("disables reduced motion", () => {
		applyA11y({ ...A11Y_DEFAULTS, reducedMotion: true })
		applyA11y({ ...A11Y_DEFAULTS, reducedMotion: false })
		expect(root.classList.contains("a11y-reduced-motion")).toBe(false)
	})

	it("delegates to preset when provided", () => {
		const calls: A11yConfig[] = []
		const preset = {
			applyA11y: (c: A11yConfig) => calls.push(c),
			applyNeuro: () => {},
		}
		const config = { ...A11Y_DEFAULTS, fontSize: 22 }
		applyA11y(config, preset)
		expect(calls).toHaveLength(1)
		expect(calls[0].fontSize).toBe(22)
		// Should not have manipulated the DOM directly
		expect(root.style.getPropertyValue("--a11y-font-size")).toBe("")
	})
})
