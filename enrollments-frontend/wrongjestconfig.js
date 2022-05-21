module.exports = {
  clearMocks: true,
  collectCoverageFrom: [
    '**/*.{js,jsx}',
    '!**/node_modules/**',
    '!jest.config.js',
    '!**/coverage/**',
    '!**/src/enterprise-app/tests/__tests__/**',
    '!**/src/enterprise-app/index.js',
    '!**/src/enterprise-app/core/helpers/**',
    '!**/src/enterprise-app/core/data/**',
    '!**/src/enterprise-app/core/config/**',
    '!**/src/enterprise-app/api/**',
    '!**/src/enterprise-app/core/router.js',
    '!**/server.js',
    '!**/src/enterprise-app/api/api_config/**',
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

  testMatch: ['<rootDir>/tests/__tests__/**/*.js?(x)', '<rootDir>/?(*.)+(spec|test).js?(x)'],
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
