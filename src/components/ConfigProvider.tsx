import { createContext } from 'react';
import config from '../config.json';

interface Config {
    serverUrl: string;
    frontendDisplayVersion: string;
}

const defaultConfig: Config = {
    serverUrl: config.serverUrl || '',
    frontendDisplayVersion: config.frontendDisplayVersion || ''
};

export const ConfigContext = createContext(defaultConfig);