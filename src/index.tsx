import chalk from 'chalk'
import { useInput, Text, type TextProps } from 'ink'
import { useState, useEffect } from 'react'
import { insertString } from 'tiny-toolkit'

export function renderCursor(string: string, cursor: number): string {
  if (cursor <= string.length - 1) {
    // IF the cursor is on a new line, the new line needs to be kept in the string
    if (string.charAt(cursor) === '\n') {
      return `${string.slice(0, cursor)}${chalk.inverse(' ')}\n${string.slice(
        cursor + 1,
        string.length,
      )}`
    }
    return `${string.slice(0, cursor)}${chalk.inverse(
      string.slice(cursor, cursor + 1),
    )}${string.slice(cursor + 1, string.length)}`
  } else {
    return `${string}${chalk.inverse(' ')}`
  }
}

// Expose this one separately from the TextArea component
// You might want to control the keyboard separately
export function useCursor({
  value,
  setValue,
  focus,
  cursorPosition,
}: {
  value: string
  setValue: (value: string) => void
  focus: boolean
  cursorPosition: number
}) {
  const [cursor, setCursor] = useState(cursorPosition)
  const [valueWithCursor, setValueWithCursor] = useState('')

  useInput(
    (input, key) => {
      if (key.return || input === '\r') {
        const newValue = insertString(value, '\n', cursor)
        setValue(newValue)
        setCursor(cursor + input.length)
      }
      if (key.rightArrow || input === 'OC') {
        if (value.length > cursor) {
          setCursor(cursor + 1)
        }
      } else if (key.leftArrow || input === 'OD') {
        if (cursor > 0) {
          setCursor(cursor - 1)
        }
      } else if (key.downArrow || input === 'OB') {
        // TODO: Go one row down
      } else if (key.upArrow || input === 'OA') {
        // TODO: Go one row up
      } else if (key.delete || key.backspace) {
        if (cursor > 0) {
          setValue(
            `${value.slice(0, cursor - 1)}${value.slice(cursor, value.length)}`,
          )
          setCursor(cursor - 1)
        }
      } else if (input !== '\r') {
        const newValue = insertString(value, input, cursor)

        setValue(newValue)

        // Input can be longer than 1 if you paste text
        setCursor(cursor + input.length)
      }
    },
    { isActive: focus },
  )

  useEffect(() => {
    // This is the render phase
    // This section is just concerned with how the string should be displayed
    // But does not alter the actual string
    // Line break
    const newValue = focus ? renderCursor(value, cursor) : value
    setValueWithCursor(newValue)
  }, [value, cursor, focus])

  return valueWithCursor
}

export default function TextArea({
  value,
  setValue,
  focus,
  cursorPosition,
  textProps,
}: {
  value: string
  setValue: (value: string) => void
  focus: boolean
  cursorPosition?: number | undefined
  textProps?: TextProps
}) {
  const valueWithCursor = useCursor({
    value,
    setValue,
    focus,
    cursorPosition: cursorPosition ?? value.length,
  })

  return <Text {...textProps}>{valueWithCursor}</Text>
}
