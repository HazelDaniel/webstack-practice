export default {
  transform: {
    "^.+\\.js$": "babel-jest"  // Tells Jest to use Babel to transpile JavaScript
  },
  testEnvironment: "node",
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1" // Fix Jest handling of module imports with .js extensions
  }
};
