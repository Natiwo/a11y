import type {
	A11yConfig,
	ColorBlindMode,
	ContrastMode,
	CursorSize,
	Preset,
	StorageAdapter,
} from "@natiwo/a11y"
import { A11Y_DEFAULTS, A11Y_STORAGE_KEY, applyA11y, localStorageAdapter } from "@natiwo/a11y"
import { useCallback, useEffect, useMemo, useState } from "react"

type UseA11yOptions = {
	preset?: Preset
	storage?: StorageAdapter
}

export function useA11y(options: UseA11yOptions = {}) {
	const { preset, storage = localStorageAdapter } = options

	const [config, setConfig] = useState<A11yConfig>(() => {
		const saved = storage.get<A11yConfig>(A11Y_STORAGE_KEY)
		return saved ? { ...A11Y_DEFAULTS, ...saved } : A11Y_DEFAULTS
	})

	useEffect(() => {
		applyA11y(config, preset)
		storage.set(A11Y_STORAGE_KEY, config)
	}, [config, preset, storage])

	const setFontSize = useCallback((fontSize: number) => {
		setConfig((prev) => ({ ...prev, fontSize: Math.min(24, Math.max(12, fontSize)) }))
	}, [])

	const setContrastMode = useCallback((contrastMode: ContrastMode) => {
		setConfig((prev) => ({ ...prev, contrastMode }))
	}, [])

	const setColorBlindMode = useCallback((colorBlindMode: ColorBlindMode) => {
		setConfig((prev) => ({ ...prev, colorBlindMode }))
	}, [])

	const setCursorSize = useCallback((cursorSize: CursorSize) => {
		setConfig((prev) => ({ ...prev, cursorSize }))
	}, [])

	const toggleReducedMotion = useCallback(() => {
		setConfig((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))
	}, [])

	const reset = useCallback(() => {
		setConfig(A11Y_DEFAULTS)
	}, [])

	return useMemo(
		() => ({
			...config,
			setFontSize,
			setContrastMode,
			setColorBlindMode,
			setCursorSize,
			toggleReducedMotion,
			reset,
		}),
		[
			config,
			setFontSize,
			setContrastMode,
			setColorBlindMode,
			setCursorSize,
			toggleReducedMotion,
			reset,
		],
	)
}
