module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", // Ensures TypeScript files are transformed
  },
  transformIgnorePatterns: [
    "/node_modules/", // Optional: add any module patterns to be ignored if needed
  ],
};
