const package = require("./package");

module.exports = {
  name: package.name,
  displayName: package.name,
  testEnvironment: "node",
  preset: "ts-jest",
  collectCoverage: true,
  collectCoverageFrom: ["**/src/**/*.ts"],
  coveragePathIgnorePatterns: ["src/index.ts"],
  testMatch: ["**/test/**/*.ts"],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  }
};
