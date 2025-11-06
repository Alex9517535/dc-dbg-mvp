// src/core/cards.ts
import type { Card } from './types';

// Fisher–Yates shuffle
export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Map card names to images in /public/cards/*
export function getCardImagePath(name: string): string {
  const key = name.toLowerCase();
  if (key.includes('punch')) return '/cards/punch.png';
  if (key.includes('kick')) return '/cards/kick.png';
  if (key.includes('weakness') || key.includes('vulnerability')) return '/cards/vulnerability.png';

  if (key.includes("aquaman")) return '/cards/aquamans-trident.png';
  if (key.includes("green arrow")) return '/cards/green-arrows-bow.png';
  if (key.includes("lasso")) return '/cards/lasso-of-truth.png';
  if (key.includes("nth metal")) return '/cards/nth-metal.png';
  if (key.includes("power ring")) return '/cards/power-ring.png';
  if (key.includes("bat-signal")) return '/cards/the-bat-signal.png';
  if (key.includes("batmobile")) return '/cards/the-batmobile.png';
  if (key.includes("cape") || key.includes("cowl")) return '/cards/the-cape-and-cowl.png';
  if (key.includes("utility belt")) return '/cards/utility-belt.png';

  return '/cards/card-back.png';
}
