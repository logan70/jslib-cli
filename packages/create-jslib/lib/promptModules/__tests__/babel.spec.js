jest.mock('fs')
jest.mock('inquirer')

const assertPromptModule = require('jslib-test-utils/assertPromptModule')

const moduleToTest = require('../babel')

test('should pass', async () => {
  const expectedPrompts = [
    {
      message: 'features',
      check: [0]
    }
  ]

  const expectedOptions = {
    plugins: {
      'jslib-plugin-babel': {}
    }
  }

  await assertPromptModule(
    moduleToTest,
    expectedPrompts,
    expectedOptions,
    { pluginsOnly: true }
  )
})

test('with TS', async () => {
  const mockTSModule = api => {
    api.onPromptComplete(answers => {
      answers.useTsWithBabel = true
      answers.features.push('ts')
    })
  }

  const expectedPrompts = [
    {
      message: 'features',
      check: [] // no need to check if "useTsWithBabel" is explicitly true
    }
  ]

  const expectedOptions = {
    plugins: {
      'jslib-plugin-babel': {}
    }
  }

  await assertPromptModule(
    [mockTSModule, moduleToTest],
    expectedPrompts,
    expectedOptions,
    { pluginsOnly: true }
  )
})

test('with TS, no Babel', async () => {
  const mockTSModule = api => {
    api.onPromptComplete(answers => {
      answers.features.push('ts')
    })
  }

  const expectedPrompts = [
    {
      message: 'features',
      check: []
    }
  ]

  const expectedOptions = {
    plugins: {}
  }

  await assertPromptModule(
    [mockTSModule, moduleToTest],
    expectedPrompts,
    expectedOptions,
    { pluginsOnly: true }
  )
})
