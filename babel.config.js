module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        cwd: "babelrc",
        root: ["./"],
        alias: {
          "@ui": "./src/ui",
          "@domain": "./src/domain",
          "@lib": "./src/lib"
        }
      }
    ]
  ]
};
