module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  moduleNameMapper: {
    "^@/components/(.*)$": "<rootDir>/src/components/$1",
    "^.+\\.svg$": "<rootDir>/svgTransform.js",
    "\\.(css|less)$": "<rootDir>/tests/jest/__mocks__/styleMock.js",
    "@next/font/(.*)": require.resolve("next/dist/build/jest/__mocks__/nextFontMock.js"),
  },
};