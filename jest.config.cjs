module.exports = {
  moduleNameMapper: {
    "#src/(.*)": "<rootDir>/src/$1",
    "#test/(.*)": "<rootDir>/test/$1"
  },
  collectCoverageFrom: ["src/**/*.js"]
}
