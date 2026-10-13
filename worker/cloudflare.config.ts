import { bindings, defineConfig, triggers } from "cf/config";


export default defineConfig({
	worker: {
		name: "god-museum-proxy",
		compatibilityDate: "2026-07-10",
		entrypoint: "index.ts",
		observability: {
			enabled: true,
			headSamplingRate: 1,
		},
		triggers: [
			triggers.fetch({
				pattern: "chendahuang.com/god-museum",
				zone: "chendahuang.com",
			}),
			triggers.fetch({
				pattern: "chendahuang.com/god-museum/*",
				zone: "chendahuang.com",
			}),
		],
		env: {
			PAGES_ORIGIN: bindings.text("https://god-museum.pages.dev"),
		},
	},
});
