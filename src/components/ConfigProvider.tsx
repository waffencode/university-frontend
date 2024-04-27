import { createContext } from 'react';
import config from '../config.json';

interface Config {
    serverUrl: string;
    apiKey: string;
    frontendDisplayVersion: string;
}

const defaultConfig: Config = {
    serverUrl: config.serverUrl || '',
    apiKey: config.apiKey || '',
    frontendDisplayVersion: config.frontendDisplayVersion || ''
};

export const ConfigContext = createContext(defaultConfig);