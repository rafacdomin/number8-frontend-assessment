export const format = (value, additionalProps) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    ...additionalProps
  })

  return formatter.format(value)
}
