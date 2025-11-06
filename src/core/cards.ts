import type { Card } from './types.ts';

export function makeBaseSet(): Card[] {
  // keep it trivial: costs 1–5, vp equals cost for demo
  const cards: Card[] = [];
  let id = 1;
  for (let cost = 1; cost <= 5; cost++) {
    for (let i = 0; i < 5; i++) {
      cards.push({ id: `C${id++}`, name: `Card ${cost}-${i+1}`, cost, vp: cost });
    }
  }
  return shuffle(cards);
}

// Fisher–Yates
export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
