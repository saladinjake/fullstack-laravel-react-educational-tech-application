module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!jest.config.js',
    '!webpack.config.dev.js',
    '!webpack.config.common.js',
    '!webpack.config.prod.js',
    '!**/coverage/**',
    '!**/src/enterprise_version/tests/__tests__/**',
    '!**/src/enterprise_version/index.js',
    '!**/src/enterprise_version/core/helpers/**',
    '!**/src/enterprise_version/core/data/**',
    '!**/src/enterprise_version/core/config/**',
    '!**/src/enterprise_version/api/**',
    '!**/src/enterprise_version/core/router.js',
    '!**/server.js',
    '!**/src/enterprise_version/api/api_config/**',
    '!**/build/**'
  ],
  coverageDirectory: 'coverage',
  moduleFileExtensions: ['js', 'json', 'jsx'],
  moduleNameMapper: {
    '\\.(css|scss)$': '<rootDir>/tests/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|otf|webp|svg)$': '<rootDir>/tests/__mocks__/fileMock.js',
  },
  setupFiles: ['<rootDir>/enzyme.config.js'],
  testEnvironment: 'jsdom',
  testMatch: ['**/tests/__tests__/**/*.js?(x)', '**/?(*.)+(spec|test).js?(x)'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/__tests__/helpers',
    '/server.js',
    '/tests/__tests__/components/__snapshots__',
    '/src/enterprise_version/core/helpers',
    '/src/enterprise_version/api/api_config/',
    '/src/enterprise_version/core/data',
    '/src/enterprise_version/core/config',
    '/src/enterprise_version/core/helpers',
   
    '/src/enterprise_version/api/',
  ]
  ,
  testURL: 'http://localhost',
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
 


  transform: {
      "^.+\\.[t|j]sx?$": "babel-jest"
    },
  
  verbose: false,
};
