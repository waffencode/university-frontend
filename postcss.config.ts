import autoprefixer from "autoprefixer";
import type { Config } from "postcss-load-config";

export default {
	plugins: [autoprefixer()],
} satisfies Config;
