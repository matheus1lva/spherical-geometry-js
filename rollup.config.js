export default [
  {
    input: "src/index.js",
    output: {
      file: "cjs.js",
      format: "cjs"
    }
  },
  {
    input: "_tests/spec.js",
    output: {
      file: "_tests/build.js",
      format: "iife",
    }
  }
]
