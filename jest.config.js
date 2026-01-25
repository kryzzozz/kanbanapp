module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/"
  ],
  testEnvironment: 'jsdom', 
  
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular'
  },
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/src/$1'
  }
};