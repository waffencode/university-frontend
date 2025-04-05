import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import type { Config } from 'postcss-load-config'

export default {
  plugins: [
    tailwindcss(),
    autoprefixer()
  ]
} satisfies Config