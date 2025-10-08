import type { Config } from "jest";
import nextJest from "next/jest";

const createJestConfig = nextJest({
  dir: "./", // Path to your Next.js app
});

const customConfig: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // resolve "@/..." imports
    "\\.(css|less|scss|sass)$": "identity-obj-proxy", // mock CSS modules
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/__mocks__/fileMock.js", // mock static assets
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};

export default createJestConfig(customConfig);
