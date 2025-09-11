// A card definition ("recipe" for cards in the supply)
export type CardDef = {
  name: string;
  cost: number;
  vp: number;
  count?: number;     // how many copies in the supply (default 1)
  set?: string;       // optional: "base", etc.
  type?: string;      // optional: "basic" | "ally" | "equip" | ...
  text?: string;      // optional: rules text (placeholder only)
};

// A concrete card instance with a unique id (what goes into piles)
export type CardId = string;
export type Card = CardDef & { id: CardId };

export type Piles = {
  deck: Card[];
  hand: Card[];
  discard: Card[];
  lineup: Card[];
  destroyed: Card[];
};

export type Phase = 'setup' | 'turn' | 'buy' | 'refill' | 'end';

export type GameState = {
  turn: number;
  phase: Phase;
  piles: Piles;
  power: number;
  score: number;
};
