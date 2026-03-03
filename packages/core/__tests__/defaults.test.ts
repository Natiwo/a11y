import { describe, expect, it } from "vitest"
import { A11Y_DEFAULTS, A11Y_STORAGE_KEY } from "../src/a11y/defaults"
import { NEURO_DEFAULTS, NEURO_STORAGE_KEY } from "../src/neuro/defaults"

describe("A11Y_DEFAULTS", () => {
	it("has fontSize 16", () => {
		expect(A11Y_DEFAULTS.fontSize).toBe(16)
	})

	it("has contrastMode default", () => {
		expect(A11Y_DEFAULTS.contrastMode).toBe("default")
	})

	it("has colorBlindMode default", () => {
		expect(A11Y_DEFAULTS.colorBlindMode).toBe("default")
	})

	it("has cursorSize default", () => {
		expect(A11Y_DEFAULTS.cursorSize).toBe("default")
	})

	it("has reducedMotion false", () => {
		expect(A11Y_DEFAULTS.reducedMotion).toBe(false)
	})

	it("uses storage key @natiwo/a11y", () => {
		expect(A11Y_STORAGE_KEY).toBe("@natiwo/a11y")
	})
})

describe("NEURO_DEFAULTS", () => {
	it("has focusHighlight false", () => {
		expect(NEURO_DEFAULTS.focusHighlight).toBe(false)
	})

	it("has readingMode false", () => {
		expect(NEURO_DEFAULTS.readingMode).toBe(false)
	})

	it("has readingRuler false", () => {
		expect(NEURO_DEFAULTS.readingRuler).toBe(false)
	})

	it("has spacing normal", () => {
		expect(NEURO_DEFAULTS.spacing).toBe("normal")
	})

	it("has fontFamily default", () => {
		expect(NEURO_DEFAULTS.fontFamily).toBe("default")
	})

	it("has textAlign default", () => {
		expect(NEURO_DEFAULTS.textAlign).toBe("default")
	})

	it("has reducedMotion false", () => {
		expect(NEURO_DEFAULTS.reducedMotion).toBe(false)
	})

	it("uses storage key @natiwo/neuro", () => {
		expect(NEURO_STORAGE_KEY).toBe("@natiwo/neuro")
	})
})
