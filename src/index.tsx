import { ColorModeProvider } from "@/components/ui/color-mode";
import { ChakraProvider, createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";
import React from "react";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./app/App.tsx";
import "./index.css";

const config = defineConfig({
	globalCss: {
		html: {
			background: "var(--chakra-colors-bg-muted)",
		},
	},
});

const system = createSystem(defaultConfig, config);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider value={system}>
			<ColorModeProvider>
				<BrowserRouter>
					<CookiesProvider>
						<App />
					</CookiesProvider>
				</BrowserRouter>
			</ColorModeProvider>
		</ChakraProvider>
	</React.StrictMode>,
);
