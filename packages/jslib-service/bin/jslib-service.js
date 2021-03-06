#!/usr/bin/env node

const semver = require('semver')
const { error, pauseSpinner } = require('jslib-util')
const requiredVersion = require('../package.json').engines.node

if (!semver.satisfies(process.version, requiredVersion)) {
  error(
    `You are using Node ${process.version}, but jslib-service ` +
    `requires Node ${requiredVersion}.\nPlease upgrade your Node version.`
  )
  process.exit(1)
}

const Service = require('../lib/Service.js')
const service = new Service(process.env.JSLIB_CONTEXT || process.cwd())

const rawArgv = process.argv.slice(2)
const args = require('minimist')(rawArgv, {
  boolean: [
    // build
    // 'no-clean',
    // serve
  ]
})
const command = args._[0]

service.run(command, args, rawArgv).catch(err => {
  pauseSpinner()
  error(err)
  process.exit(1)
})
