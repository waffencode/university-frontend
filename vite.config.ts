import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import viteTsconfigPaths from "vite-tsconfig-paths";
import postcssConfig from "./postcss.config";

export default defineConfig({
	plugins: [react(), viteTsconfigPaths(), mkcert(), tailwindcss()],
	css: {
		postcss: postcssConfig,
	},
	resolve: {
		alias: [{ find: "@", replacement: resolve(__dirname, "./src") }],
	},
	server: {
		open: false,
		port: 3000,
	},
	build: {
		outDir: "build",
	},
	define: {
		"import.meta.env.APP_VERSION": JSON.stringify(process.env.npm_package_version),
	},
});
