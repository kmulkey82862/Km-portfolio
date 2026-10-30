// Unambiguous alphabet: no 0/O, 1/I/L, so codes survive being read aloud or retyped.
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function randomCode(length: number): string {
  const bytes = new Uint32Array(length);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => ALPHABET[b % ALPHABET.length]).join('');
}

/** Generate `count` unique codes, guaranteed collision-free. */
export function uniqueCodes(count: number, length: number, prefix = ''): string[] {
  const seen = new Set<string>();
  const capacity = ALPHABET.length ** length;
  if (count > capacity / 2) throw new Error('Code length too short for this many invitees');
  while (seen.size < count) seen.add(prefix + randomCode(length));
  return [...seen];
}

export function merge(template: string, fields: Record<string, string>): string {
  return template.replace(/\{\{\s*(\w+)\s*\}\}/g, (m, key) => fields[key] ?? m);
}

export function parseCsv(text: string): Record<string, string>[] {
  const [header, ...rows] = text.trim().split(/\r?\n/).filter((l) => l.trim());
  if (!header) return [];
  const keys = header.split(',').map((k) => k.trim().toLowerCase());
  return rows.map((r) => {
    const cells = r.split(',').map((c) => c.trim());
    return Object.fromEntries(keys.map((k, i) => [k, cells[i] ?? '']));
  });
}

export function toCsv(rows: Record<string, string | number>[]): string {
  if (!rows.length) return '';
  const keys = Object.keys(rows[0]);
  const esc = (v: string | number) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));
  return [keys.join(','), ...rows.map((r) => keys.map((k) => esc(r[k])).join(','))].join('\n');
}
