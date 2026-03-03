import { act, renderHook } from "@testing-library/react"
import { beforeEach, describe, expect, it } from "vitest"
import type { StorageAdapter } from "@natiwo/a11y"
import { useNeuro } from "../src/use-neuro"

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

describe("useNeuro", () => {
	let storage: StorageAdapter

	beforeEach(() => {
		storage = createMemoryStorage()
		document.documentElement.className = ""
	})

	it("initializes with defaults", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		expect(result.current.focusHighlight).toBe(false)
		expect(result.current.readingMode).toBe(false)
		expect(result.current.readingRuler).toBe(false)
		expect(result.current.spacing).toBe("normal")
		expect(result.current.fontFamily).toBe("default")
		expect(result.current.textAlign).toBe("default")
		expect(result.current.reducedMotion).toBe(false)
	})

	it("toggleFocusHighlight toggles the boolean", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => result.current.toggleFocusHighlight())
		expect(result.current.focusHighlight).toBe(true)
		act(() => result.current.toggleFocusHighlight())
		expect(result.current.focusHighlight).toBe(false)
	})

	it("toggleReadingMode toggles the boolean", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => result.current.toggleReadingMode())
		expect(result.current.readingMode).toBe(true)
	})

	it("toggleReadingRuler toggles the boolean", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => result.current.toggleReadingRuler())
		expect(result.current.readingRuler).toBe(true)
	})

	it("setSpacing updates spacing", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => result.current.setSpacing("wide"))
		expect(result.current.spacing).toBe("wide")
	})

	it("setFontFamily updates fontFamily", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => result.current.setFontFamily("dyslexia"))
		expect(result.current.fontFamily).toBe("dyslexia")
	})

	it("setTextAlign updates textAlign", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => result.current.setTextAlign("left"))
		expect(result.current.textAlign).toBe("left")
	})

	it("toggleReducedMotion toggles the boolean", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => result.current.toggleReducedMotion())
		expect(result.current.reducedMotion).toBe(true)
		act(() => result.current.toggleReducedMotion())
		expect(result.current.reducedMotion).toBe(false)
	})

	it("reset returns to defaults", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => {
			result.current.toggleFocusHighlight()
			result.current.setSpacing("wide")
			result.current.setFontFamily("lexend")
		})
		act(() => result.current.reset())
		expect(result.current.focusHighlight).toBe(false)
		expect(result.current.spacing).toBe("normal")
		expect(result.current.fontFamily).toBe("default")
	})

	it("persists config to storage", () => {
		const { result } = renderHook(() => useNeuro({ storage }))
		act(() => result.current.setFontFamily("atkinson"))
		const saved = storage.get<{ fontFamily: string }>("@natiwo/neuro")
		expect(saved?.fontFamily).toBe("atkinson")
	})

	it("restores config from storage on initialization", () => {
		storage.set("@natiwo/neuro", { fontFamily: "lexend", spacing: "wide" })
		const { result } = renderHook(() => useNeuro({ storage }))
		expect(result.current.fontFamily).toBe("lexend")
		expect(result.current.spacing).toBe("wide")
	})
})
