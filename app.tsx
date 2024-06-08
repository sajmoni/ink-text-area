// File used for testing
import { render } from 'ink'
import React from 'react'
import process from 'node:process'

import TextArea from './src/index.js'

export const clearConsole = () => {
  process.stdout.write(
    process.platform === 'win32' ?
      '\u001B[2J\u001B[0f'
    : '\u001B[2J\u001B[3J\u001B[H',
  )
}

function App() {
  const [value, setValue] = React.useState('Hello World')
  return (
    <TextArea
      value={value}
      setValue={setValue}
      focus
    />
  )
}
clearConsole()
render(<App></App>)
