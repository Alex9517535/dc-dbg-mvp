export type CardId = string;

export type Card = {
  id: CardId;
  name: string;        // placeholder-only
  cost: number;        // simple buy cost
  vp: number;          // victory points for end scoring
};

export type Piles = {
  deck: Card[];
  hand: Card[];
  discard: Card[];
  lineup: Card[];      // market / line-up
  destroyed: Card[];
};

export type Phase = 'setup' | 'turn' | 'buy' | 'refill' | 'end';

export type GameState = {
  turn: number;
  phase: Phase;
  piles: Piles;
  power: number;       // simple currency earned/available this turn
  score: number;       // running score for demo; final tally on end
};
