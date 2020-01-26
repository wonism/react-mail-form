const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = {
  transform: {
    ...tsjPreset.transform,
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.([tj]sx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    __PATH_PREFIX__: '',
    'ts-jest': {
      tsConfig: 'tsconfig.json',
      diagnostics: false,
      autoMapModuleNames: true,
    },
  },
  testURL: 'http://localhost',
  collectCoverageFrom: [
    'lib/**/*.{ts,tsx}',
    '!<rootDir>/node_modules/',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFilesAfterEnv: ['<rootDir>/setupEnzyme.ts'],
};
