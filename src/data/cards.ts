// src/data/cards.ts
import type { Card } from '../core/types';

const BASE: Omit<Card, 'id'>[] = [
  { name: "Punch",        cost: 0, vp: 0 },
  { name: "Kick",         cost: 2, vp: 1 },
  { name: "Weakness",     cost: 0, vp: -1 },

  { name: "Aquaman's Trident", cost: 3, vp: 1 },
  { name: "Green Arrow's Bow", cost: 3, vp: 1 },
  { name: "Lasso of Truth",    cost: 3, vp: 1 },
  { name: "Nth Metal",         cost: 4, vp: 2 },
  { name: "Power Ring",        cost: 3, vp: 1 },
  { name: "The Bat-Signal",    cost: 3, vp: 1 },
  { name: "The Batmobile",     cost: 3, vp: 1 },
  { name: "The Cape and Cowl", cost: 3, vp: 1 },
  { name: "Utility Belt",      cost: 3, vp: 2 },
];

export function getBaseDeck(): Card[] {
  // give every card a unique id so duplicates can exist
  return BASE.map((c, i) => ({ ...c, id: `base-${i}` }))
    // add typical starters (7 Punch, 3 Weakness)
    .concat(
      ...Array.from({ length: 7 }, (_, i) => ({ id: `starter-punch-${i}`, name: "Punch", cost: 0, vp: 0 })),
      ...Array.from({ length: 3 }, (_, i) => ({ id: `starter-weak-${i}`, name: "Weakness", cost: 0, vp: -1 })),
    );
}
