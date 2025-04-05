import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteTsconfigPaths from 'vite-tsconfig-paths'
import postcssConfig from './postcss.config'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
    plugins: [react(), viteTsconfigPaths(), mkcert()],
    css: {
        postcss: postcssConfig
    },
    server: {
        open: true,
        port: 3000,
    },
    build: {
        outDir: 'build',
    },
})