export function PadZero(n: number): string {
  return (n < 10 ? '0' : '') + n
}