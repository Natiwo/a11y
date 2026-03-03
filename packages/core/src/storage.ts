import type { StorageAdapter } from "./types"

export const localStorageAdapter: StorageAdapter = {
	get: <T>(key: string): T | null => {
		try {
			const raw = localStorage.getItem(key)
			return raw ? (JSON.parse(raw) as T) : null
		} catch {
			return null
		}
	},
	set: <T>(key: string, value: T) => {
		try {
			localStorage.setItem(key, JSON.stringify(value))
		} catch {
			// storage full or unavailable
		}
	},
}
