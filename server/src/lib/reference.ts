export function generateReference(): string {
  return "RD-" + Math.floor(100000 + Math.random() * 900000);
}
