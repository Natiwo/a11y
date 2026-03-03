import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import type { StorageAdapter } from "@natiwo/a11y"
import { useA11y } from "../src/use-a11y"

function createMemoryStorage(): StorageAdapter {
	const store = new Map<string, string>()
	return {
		get: <T>(key: string): T | null => {
			const raw = store.get(key)
			return raw ? (JSON.parse(raw) as T) : null
		},
		set: <T>(key: string, value: T) => {
			store.set(key, JSON.stringify(value))
		},
	}
}

describe("useA11y", () => {
	let storage: StorageAdapter

	beforeEach(() => {
		storage = createMemoryStorage()
		document.documentElement.className = ""
		document.documentElement.style.cssText = ""
	})

	it("initializes with defaults", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		expect(result.current.fontSize).toBe(16)
		expect(result.current.contrastMode).toBe("default")
		expect(result.current.colorBlindMode).toBe("default")
		expect(result.current.cursorSize).toBe("default")
		expect(result.current.reducedMotion).toBe(false)
	})

	it("setFontSize updates fontSize", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => result.current.setFontSize(20))
		expect(result.current.fontSize).toBe(20)
	})

	it("setFontSize clamps minimum to 12", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => result.current.setFontSize(8))
		expect(result.current.fontSize).toBe(12)
	})

	it("setFontSize clamps maximum to 24", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => result.current.setFontSize(30))
		expect(result.current.fontSize).toBe(24)
	})

	it("setContrastMode updates contrastMode", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => result.current.setContrastMode("high"))
		expect(result.current.contrastMode).toBe("high")
	})

	it("setColorBlindMode updates colorBlindMode", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => result.current.setColorBlindMode("protanopia"))
		expect(result.current.colorBlindMode).toBe("protanopia")
	})

	it("setCursorSize updates cursorSize", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => result.current.setCursorSize("large"))
		expect(result.current.cursorSize).toBe("large")
	})

	it("toggleReducedMotion toggles the boolean", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => result.current.toggleReducedMotion())
		expect(result.current.reducedMotion).toBe(true)
		act(() => result.current.toggleReducedMotion())
		expect(result.current.reducedMotion).toBe(false)
	})

	it("reset returns to defaults", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => {
			result.current.setFontSize(22)
			result.current.setContrastMode("high")
			result.current.setCursorSize("xlarge")
		})
		act(() => result.current.reset())
		expect(result.current.fontSize).toBe(16)
		expect(result.current.contrastMode).toBe("default")
		expect(result.current.cursorSize).toBe("default")
	})

	it("persists config to storage", () => {
		const { result } = renderHook(() => useA11y({ storage }))
		act(() => result.current.setFontSize(20))
		const saved = storage.get<{ fontSize: number }>("@natiwo/a11y")
		expect(saved?.fontSize).toBe(20)
	})

	it("restores config from storage on initialization", () => {
		storage.set("@natiwo/a11y", { fontSize: 22, contrastMode: "high" })
		const { result } = renderHook(() => useA11y({ storage }))
		expect(result.current.fontSize).toBe(22)
		expect(result.current.contrastMode).toBe("high")
	})
})
