const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@/contexts/(.*)$': '<rootDir>/src/contexts/$1',
    '^@/user/(.*)$': '<rootDir>/src/contexts/user/$1',
    '^@/course/(.*)$': '<rootDir>/src/contexts/course/$1',
    '^@/learning/(.*)$': '<rootDir>/src/contexts/learning/$1',
    '^@/analytics/(.*)$': '<rootDir>/src/contexts/analytics/$1',
    '^@/infrastructure/(.*)$': '<rootDir>/src/contexts/infrastructure/$1',
    '^@/lib/(.*)$': '<rootDir>/src/lib/$1',
    '^@/shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@/tests/(.*)$': '<rootDir>/tests/$1',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/tests/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/lib/trpc/root.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: {
        jsx: 'react',
      },
    }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);