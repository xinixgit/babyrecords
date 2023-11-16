export function PadZero(n: number): string {
  return (n < 10 ? '0' : '') + n
}

export function ToDateString(d: Date): string {
  return `${d.getFullYear()}-${PadZero(d.getMonth() + 1)}-${PadZero(d.getDate())}`
}