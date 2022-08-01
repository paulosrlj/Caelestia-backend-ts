module.exports = {
  roots: ['<rootDir>/__test__'],
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/__test__/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-node',
  transform: {
    '.+\\.ts$': 'ts-jest',
  },
};
