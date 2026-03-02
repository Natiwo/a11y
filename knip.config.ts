import type { KnipConfig } from "knip"

const config: KnipConfig = {
	workspaces: {
		"packages/core": {
			entry: ["src/index.ts"],
			project: ["src/**/*.ts"],
		},
		"packages/react": {
			entry: ["src/index.ts"],
			project: ["src/**/*.ts"],
		},
		"packages/morpheus": {
			entry: ["src/index.ts"],
			project: ["src/**/*.ts"],
		},
	},
	ignore: ["**/dist/**", "**/__tests__/**"],
}

export default config
