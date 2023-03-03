module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  transformIgnorePatterns: ["node_modules/(?!axios)","node_modules/(?!client)"],
  moduleFileExtensions: ['ts', 'js'],
  moduleDirectories: ["node_modules", "src"],
  testTimeout: 20000,
}