import type { KnipConfig } from "knip"

const config: KnipConfig = {
	ignoreBinaries: ["gitleaks"],
	ignoreDependencies: ["@vitest/coverage-v8"],
	workspaces: {
		"packages/core": {
			project: ["src/**/*.ts"],
		},
		"packages/react": {
			project: ["src/**/*.ts"],
		},
		"packages/morpheus": {
			project: ["src/**/*.ts"],
		},
	},
}

export default config
