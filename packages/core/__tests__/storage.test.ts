import { beforeEach, describe, expect, it, vi } from "vitest"
import { localStorageAdapter } from "../src/storage"

function createMockLocalStorage() {
	const store = new Map<string, string>()
	return {
		getItem: (key: string) => store.get(key) ?? null,
		setItem: (key: string, value: string) => store.set(key, value),
		removeItem: (key: string) => store.delete(key),
		clear: () => store.clear(),
		get length() {
			return store.size
		},
		key: (index: number) => [...store.keys()][index] ?? null,
	}
}

describe("localStorageAdapter", () => {
	beforeEach(() => {
		vi.stubGlobal("localStorage", createMockLocalStorage())
	})

	it("returns null for non-existent key", () => {
		expect(localStorageAdapter.get("does-not-exist")).toBeNull()
	})

	it("saves and retrieves an object", () => {
		localStorageAdapter.set("test", { a: 1, b: "two" })
		expect(localStorageAdapter.get("test")).toEqual({ a: 1, b: "two" })
	})

	it("saves and retrieves a string", () => {
		localStorageAdapter.set("str", "hello")
		expect(localStorageAdapter.get("str")).toBe("hello")
	})

	it("saves and retrieves a number", () => {
		localStorageAdapter.set("num", 42)
		expect(localStorageAdapter.get("num")).toBe(42)
	})

	it("saves and retrieves a boolean", () => {
		localStorageAdapter.set("bool", true)
		expect(localStorageAdapter.get("bool")).toBe(true)
	})

	it("overwrites an existing value", () => {
		localStorageAdapter.set("key", "v1")
		localStorageAdapter.set("key", "v2")
		expect(localStorageAdapter.get("key")).toBe("v2")
	})

	it("returns null when localStorage contains invalid JSON", () => {
		window.localStorage.setItem("bad", "{invalid")
		expect(localStorageAdapter.get("bad")).toBeNull()
	})
})
