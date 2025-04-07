import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import postcssConfig from './postcss.config'
import mkcert from 'vite-plugin-mkcert'
import { resolve } from 'path'

export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), mkcert()],
    css: {
        postcss: postcssConfig
    },
    resolve: {
        alias: [{ find: "@", replacement: resolve(__dirname, "./src") }]
    },
    server: {
        open: false,
        port: 3000,
    },
    build: {
        outDir: 'build',
    },
})