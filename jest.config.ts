/* eslint-disable import/no-extraneous-dependencies */
import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest/utils';

import { compilerOptions } from './tsconfig.json';

const config: Config.InitialOptions = {
 clearMocks: true,
 collectCoverage: true,
 collectCoverageFrom: ['<rootDir>/src/modules/**/services/*.ts'],
 coverageDirectory: 'coverage',
 coverageReporters: ['text-summary', 'lcov'],
 moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
 preset: 'ts-jest',
 testEnvironment: 'node',
 testMatch: ['**/*.spec.ts'],
};

export default config;
