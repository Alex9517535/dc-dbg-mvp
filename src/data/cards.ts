// src/data/cards.ts
import type { Card, CardDef } from "../core/types";

const BASE_CARDS: CardDef[] = [
  { name: "Punch",   cost: 1, vp: 1, count: 10, set: "base", type: "basic" },
  { name: "Kick",    cost: 2, vp: 1, count: 8,  set: "base", type: "basic" },
  { name: "Gadget",  cost: 3, vp: 2, count: 6,  set: "base", type: "equip" },
  { name: "Ally",    cost: 4, vp: 3, count: 5,  set: "base", type: "ally" },
  { name: "Big Move",cost: 5, vp: 4, count: 5,  set: "base", type: "action" },
];

export function generateDeckFrom(defs: CardDef[], prefix = "B"): Card[] {
  const deck: Card[] = [];
  let seq = 1;
  for (const d of defs) {
    const copies = d.count ?? 1;
    for (let i = 0; i < copies; i++) {
      deck.push({ ...d, id: `${prefix}${seq++}` });
    }
  }
  return deck;
}

export function getBaseDeck(): Card[] {
  return generateDeckFrom(BASE_CARDS, "B");
}
