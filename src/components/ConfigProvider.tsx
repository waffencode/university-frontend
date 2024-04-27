import React, { createContext, FC, useContext, useEffect, useState } from 'react';
import config from '../config.json'; // Предполагаем, что config.json находится в той же директории, что и ваш компонент

interface Config {
    serverUrl: string;
    apiKey: string;
    frontendDisplayVersion: string;
}

const defaultConfig: Config = {
    serverUrl: config.serverUrl || '', // Используем значение из config.json, если оно есть, иначе пустую строку
    apiKey: config.apiKey || '',
    frontendDisplayVersion: config.frontendDisplayVersion || ''
};

export const ConfigContext = createContext(defaultConfig);