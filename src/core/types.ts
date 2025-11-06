// A card definition ("recipe" for cards in the supply)
export type CardDef = {
  name: string;
  cost: number;
  vp?: number;        // optional so engine can do (card.vp ?? 0)
  power?: number;     // optional if you want explicit power on cards
  count?: number;
  set?: string;
  type?: string;
  text?: string;
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

// --- Action / Turn History Log ---

export type LogKind =
  | 'game/start'
  | 'turn/end'
  | 'turn/next'
  | 'buy/attempt'
  | 'buy/success'
  | 'shuffle'
  | 'refill'
  | 'save'
  | 'load'
  | 'menu/show'
  | 'menu/hide'
  | 'card/view';

export type LogEntry = {
  id: string;
  ts: number;      // Date.now()
  turn: number;
  phase: Phase;
  kind: LogKind;
  msg: string;     // human-readable
  data?: Record<string, unknown>;
};

