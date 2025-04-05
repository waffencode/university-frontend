/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disabling the preflight to fix the issue with ChakraUI.
  corePlugins: {
    preflight: false,
  }
}