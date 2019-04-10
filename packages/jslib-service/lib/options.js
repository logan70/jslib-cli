const fs = require('fs')
const path = require('path')
const readPkg = require('read-pkg')
const { createSchema, validate } = require('jslib-util')

// get project name
const getName = () => {
  const context = process.env.JSLIB_CONTEXT || process.cwd()
  if (fs.existsSync(path.join(context, 'package.json'))) {
    const pkg = readPkg.sync({ cwd: context })
    return pkg.name || '_'
  } else {
    return '_'
  }
}

const schema = createSchema(joi => joi.object({
  name: joi.string(),
  outputDir: joi.string(),
  formats: joi.array(),
  transpileDependencies: joi.array(),
  productionSourceMap: joi.boolean(),

  // known runtime options for built-in plugins
  lintOnSave: joi.boolean(),

  lintConfig: joi.object({
    format: joi.string(),
    fix: joi.boolean()
  }),

  banner: joi.string(),
  footer: joi.string(),
  changeRollup: joi.func()
}))

exports.validate = (options, cb) => {
  validate(options, schema, cb)
}

exports.defaults = () => ({
  // name for iife/umd bundles that exports values in which case it is the global variable name representing your bundle.
  name: getName(),

  // where to output built files
  outputDir: 'dist',

  // Specifies the formats of the generated bundle, supports following types:
  // umd – Universal Module Definition, works as amd, cjs and iife all in one
  // umd-min – uglified umd
  // cjs – CommonJS, suitable for Node and other bundlers
  // esm – Keep the bundle as an ES module file, suitable for other bundlers and inclusion as a <script type=module> tag in modern browsers
  formats: ['umd'],

  // deps to transpile
  transpileDependencies: [/* string or regex */],

  // sourceMap for production build?
  productionSourceMap: false,

  // whether to use esLint/tsLint
  lintOnSave: true,

  // lint config
  lintConfig: {
    format: 'codeFrame'
  },

  // Code to insert at top of bundle (outside wrapper)
  banner: `/*!
  * Generated by create-jslib. (https://github.com/logan70/create-jslib)
  * Copyright 2018-${(new Date()).getFullYear()} logan70. All Rights Reserved
  * Licensed under MIT (https://github.com/logan70/create-jslib/blob/master/LICENSE)
  */`,

  // Code to insert at end of bundle (outside wrapper)
  footer: ''
})
