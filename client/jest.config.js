module.exports = {
  moduleFileExtensions: [
    'js',
    'json',
    'vue'
  ],

  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|sass|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest'
  },

  transformIgnorePatterns: [
    '/node_modules/'
  ],

  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  snapshotSerializers: ['jest-serializer-vue'],

  // testMatch: [
  //   '**/tests/unit/**/*.spec.js|**/__tests__/*.js'
  // ],

  testURL: 'http://localhost/'
}
