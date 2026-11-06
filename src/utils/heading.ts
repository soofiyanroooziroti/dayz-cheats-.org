const EM_DASH_BREAK = ' — ';

/**
 * Brand heading: text after a spaced em dash (` — `) is one accent block (avoids splitting
 * mid-compound like "aimbot & pricing"). Otherwise last word = accent.
 */
export function splitBrandHeading(text: string): { lead: string; accent: string } {
  const trimmed = text.trim();
  if (!trimmed) return { lead: '', accent: '' };
  const dashIdx = trimmed.lastIndexOf(EM_DASH_BREAK);
  if (dashIdx > 0) {
    return {
      lead: trimmed.slice(0, dashIdx).trimEnd(),
      accent: trimmed.slice(dashIdx + EM_DASH_BREAK.length).trim(),
    };
  }
  const lastSpace = trimmed.lastIndexOf(' ');
  if (lastSpace <= 0) return { lead: '', accent: trimmed };
  return { lead: trimmed.slice(0, lastSpace), accent: trimmed.slice(lastSpace + 1) };
}
