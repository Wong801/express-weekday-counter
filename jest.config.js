module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**',
    'src/app.js',
    '!src/index.js',
    '!src/api/routes/*',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'json',
    'text',
    'cobertura',
  ],
  reporters: ['default', 'jest-junit'],
  setupFilesAfterEnv: ['./spec/setupTests.js'],
  testEnvironment: 'node',
};
