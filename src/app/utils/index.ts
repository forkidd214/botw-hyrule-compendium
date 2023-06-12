export function toPascalCase(input: string): string {
  return input.replace(/(\w)(\w*)/g, (_, firstChar, remainingChars) => {
    return firstChar.toUpperCase() + remainingChars.toLowerCase()
  })
}

export function joinClassNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}
