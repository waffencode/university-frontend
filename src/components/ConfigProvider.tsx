import { createContext } from "react";
import config from "../config.json";

interface Config {
	serverUrl: string;
}

const defaultConfig: Config = {
	serverUrl: config.serverUrl || "",
};

/** Defines a React context to manage configuration data for the frontend.
 * The defaultConfig object initializes configuration values from a JSON file.
 *
 * @author
 * waffencode@gmail.com
 */
export const ConfigContext = createContext(defaultConfig);
