// src/core/engine.ts
import type { GameState, Card } from './types.ts';
import { getBaseDeck } from '../data/cards.ts';
import { shuffle } from './cards.ts';

const HAND_SIZE = 5;
const LINEUP_SIZE = 5;

/* ------------------------- helpers (pure) ------------------------- */

function drawPure(state: GameState, n: number): GameState {
  let deck = [...state.piles.deck];
  let discard = [...state.piles.discard];
  const hand = [...state.piles.hand];
  let power = state.power;

  let count = n;
  while (count-- > 0) {
    if (deck.length === 0) {
      if (discard.length === 0) break;
      deck = shuffle(discard);
      discard = [];
    }
    const c = deck.pop()!;
    hand.push(c);
    // placeholder power rule
    power += Math.floor(c.cost / 2);
  }

  return {
    ...state,
    piles: { ...state.piles, deck, discard, hand },
    power,
  };
}

function refillLineupPure(state: GameState): GameState {
  let deck = [...state.piles.deck];
  let discard = [...state.piles.discard];
  const lineup = [...state.piles.lineup];

  while (lineup.length < LINEUP_SIZE) {
    if (deck.length === 0) {
      if (discard.length === 0) break;
      deck = shuffle(discard);
      discard = [];
    }
    lineup.push(deck.pop()!);
  }

  return {
    ...state,
    piles: { ...state.piles, deck, discard, lineup },
  };
}

/* --------------------------- API (pure) --------------------------- */

export function newGame(): GameState {
  const deck = shuffle(getBaseDeck());
  const base: GameState = {
    turn: 1,
    phase: 'setup',
    piles: { deck, hand: [], discard: [], lineup: [], destroyed: [] },
    power: 0,
    score: 0,
  };

  // initial lineup + starting hand, then move to turn phase
  const withLineup = refillLineupPure(base);
  const withHand = drawPure(withLineup, HAND_SIZE);
  return { ...withHand, phase: 'turn' as const };
}

export function draw(state: GameState, n: number): GameState {
  return drawPure(state, n);
}

export function endTurn(state: GameState): GameState {
  if (state.phase !== 'turn') return state;
  const hand = state.piles.hand;
  return {
    ...state,
    phase: 'buy' as const,
    piles: {
      ...state.piles,
      hand: [],
      discard: [...state.piles.discard, ...hand],
    },
  };
}

export function canBuy(state: GameState, card: Card) {
  return state.phase === 'buy' && state.power >= card.cost;
}

export function buyFromLineup(state: GameState, cardId: string): GameState {
  if (state.phase !== 'buy') return state;

  const idx = state.piles.lineup.findIndex((c) => c.id === cardId);
  if (idx === -1) return state;

  const card = state.piles.lineup[idx];
  if (!canBuy(state, card)) return state;

  const lineup = [...state.piles.lineup];
  lineup.splice(idx, 1);

  return {
    ...state,
    phase: 'refill' as const,
    power: state.power - card.cost,
    score: state.score + card.vp,
    piles: {
      ...state.piles,
      lineup,
      discard: [...state.piles.discard, card],
    },
  };
}

export function refillLineup(state: GameState): GameState {
  return refillLineupPure(state);
}

export function nextTurn(state: GameState): GameState {
  if (state.phase !== 'refill') return state;

  // 1) Refill lineup (in case something removed it)
  const afterRefill = refillLineupPure(state);

  // 2) Advance turn, reset power, draw a hand, enter 'turn'
  const advanced: GameState = {
    ...afterRefill,
    turn: afterRefill.turn + 1,
    power: 0,
    phase: 'turn',
  };

  return drawPure(advanced, HAND_SIZE);
}

export function isGameOver(state: GameState) {
  const noCards =
    state.piles.deck.length === 0 && state.piles.discard.length === 0;
  return noCards || state.turn > 10;
}
