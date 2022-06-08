export default {
  rootDir: 'src',
  moduleNameMapper: {
    '\\.(css|png|jpeg)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-svg-transformer',
  },
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  coverageDirectory: '../coverage',
  coverageReporters: ['html', 'cobertura'],
  transform: {
    '^.+\\.(js|jsx)$': 'ts-jest',
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  collectCoverage: false,
  forceCoverageMatch: ['**/*.test.ts', '**/*.test.tsx'],
  resetMocks: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
