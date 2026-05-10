import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function ensureStringArray(val: unknown): string[] {
  if (Array.isArray(val)) return val as string[];
  if (typeof val === "string" && val.startsWith("{")) {
    const inner = val.slice(1, -1);
    if (!inner) return [];
    const result: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < inner.length; i++) {
      const ch = inner[i];
      if (ch === '"' && inner[i - 1] !== "\\") { inQuotes = !inQuotes; }
      else if (ch === "," && !inQuotes) { result.push(current.replace(/\\"/g, '"')); current = ""; }
      else { current += ch; }
    }
    result.push(current.replace(/\\"/g, '"'));
    return result.filter(Boolean);
  }
  return [];
}
