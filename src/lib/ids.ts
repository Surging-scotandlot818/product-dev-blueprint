// Stable IDs across documents. Format: PREFIX-NNN.

export function nextId(prefix: string, existing: { id: string }[]): string {
  const used = new Set(existing.map((e) => e.id));
  for (let n = 1; n < 10000; n++) {
    const id = `${prefix}-${String(n).padStart(3, "0")}`;
    if (!used.has(id)) return id;
  }
  throw new Error(`ID space exhausted for ${prefix}`);
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}
