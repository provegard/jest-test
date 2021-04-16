const {
  compile,
  helpers,
  FILE_EXTENSIONS
} = require("coffeescript")

const h = helpers

const coffee = FILE_EXTENSIONS.map((ext) => {
  return ext.slice(1)
})

module.exports = {
  //moduleFileExtensions: ["js", "json", ...coffee],
  //testMatch: [`<rootDir>/*@(test|spec)?(s){/**/,}*.@(${coffee.join('|')})`],
  testPathIgnorePatterns: ['node_modules', 'fixtures'],
  transform: {
    [coffee.join('|')]: __filename,
    "\\.[jt]sx?$": "babel-jest"
  },
  setupFilesAfterEnv: [__filename],
  process: (source, file) => {
    if (!h.isCoffee(file)) {
      return source
    }
    if (h.isLiterate(file)) {
      source = h.invertLiterate(source)
    }
    const transpile = {
      plugins: ["@babel/transform-modules-commonjs"],
      presets: ["jest"]
    }
    return compile(source, {
      bare: true,
      inlineMap: true,
      transpile
    })
  }
}
