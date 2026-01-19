export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

export function contains(input: string, patterns: string[]): boolean {
  return patterns.some((p) => input.includes(p.toLowerCase()));
}

export function calculateRisk(red: number, green: number): number {
  const raw = red * 8 - green * 3;
  return Math.min(100, Math.max(0, raw));
}
