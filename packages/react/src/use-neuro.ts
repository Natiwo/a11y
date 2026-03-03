import type {
	FontFamily,
	NeuroConfig,
	Preset,
	SpacingMode,
	StorageAdapter,
	TextAlign,
} from "@natiwo/a11y"
import { applyNeuro, localStorageAdapter, NEURO_DEFAULTS, NEURO_STORAGE_KEY } from "@natiwo/a11y"
import { useCallback, useEffect, useMemo, useState } from "react"

type UseNeuroOptions = {
	preset?: Preset
	storage?: StorageAdapter
}

export function useNeuro(options: UseNeuroOptions = {}) {
	const { preset, storage = localStorageAdapter } = options

	const [config, setConfig] = useState<NeuroConfig>(() => {
		const saved = storage.get<NeuroConfig>(NEURO_STORAGE_KEY)
		return saved ? { ...NEURO_DEFAULTS, ...saved } : NEURO_DEFAULTS
	})

	useEffect(() => {
		applyNeuro(config, preset)
		storage.set(NEURO_STORAGE_KEY, config)
	}, [config, preset, storage])

	const toggleFocusHighlight = useCallback(() => {
		setConfig((prev) => ({ ...prev, focusHighlight: !prev.focusHighlight }))
	}, [])

	const toggleReadingMode = useCallback(() => {
		setConfig((prev) => ({ ...prev, readingMode: !prev.readingMode }))
	}, [])

	const toggleReadingRuler = useCallback(() => {
		setConfig((prev) => ({ ...prev, readingRuler: !prev.readingRuler }))
	}, [])

	const setSpacing = useCallback((spacing: SpacingMode) => {
		setConfig((prev) => ({ ...prev, spacing }))
	}, [])

	const setFontFamily = useCallback((fontFamily: FontFamily) => {
		setConfig((prev) => ({ ...prev, fontFamily }))
	}, [])

	const setTextAlign = useCallback((textAlign: TextAlign) => {
		setConfig((prev) => ({ ...prev, textAlign }))
	}, [])

	const toggleReducedMotion = useCallback(() => {
		setConfig((prev) => ({ ...prev, reducedMotion: !prev.reducedMotion }))
	}, [])

	const reset = useCallback(() => {
		setConfig(NEURO_DEFAULTS)
	}, [])

	return useMemo(
		() => ({
			...config,
			toggleFocusHighlight,
			toggleReadingMode,
			toggleReadingRuler,
			setSpacing,
			setFontFamily,
			setTextAlign,
			toggleReducedMotion,
			reset,
		}),
		[
			config,
			toggleFocusHighlight,
			toggleReadingMode,
			toggleReadingRuler,
			setSpacing,
			setFontFamily,
			setTextAlign,
			toggleReducedMotion,
			reset,
		],
	)
}
