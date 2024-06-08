# ink-text-area

> Multi-line text area for ink

## :sparkles: Features

- Multi-line text
- Placeholder
- Advanced keyboard input
- Hold shift to highlight multiple characters
- Copy and paste
- Possible to disable / hide if not focused

## :package: Install

```console
npm install ink-text-area
```

## :wrench: Example usage

```tsx
const [value, setValue] = useState('Hello World')
return (
  <TextArea
    value={value}
    setValue={setValue}
    focus
  />
)
```

## :newspaper: Props

```ts
{
  value: string
  setValue: (value: string) => void
  focus: boolean
  cursorPosition?: number | undefined
  textProps?: TextProps
}
```
