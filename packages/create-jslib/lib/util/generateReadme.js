const descriptions = {
  build: 'Compiles and minifies for production',
  dev: 'Compiles and hot-rebuilds for development',
  lint: 'Lints and fixes files',
  test: 'Run your tests'
  // 'test:e2e': 'Run your end-to-end tests',
  // 'test:unit': 'Run your unit tests'
}

function printScripts (pkg, packageManager) {
  return Object.keys(pkg.scripts || {}).map(key => {
    if (!descriptions[key]) return ''
    return [
      `\n### ${descriptions[key]}`,
      '```',
      `${packageManager} run ${key}`,
      '```',
      ''
    ].join('\n')
  }).join('')
}

module.exports = function generateReadme (pkg, packageManager) {
  return [
    `# ${pkg.name}\n`,
    '## Project setup',
    '```',
    `${packageManager} install`,
    '```',
    printScripts(pkg, packageManager),
    '### Customize configuration',
    'See [Configuration Reference](https://github.com/logan70/jslib-cli).',
    ''
  ].join('\n')
}
