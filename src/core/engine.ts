import type { Card, GameState } from "./types";
import { getBaseDeck } from "../data/cards";
import { shuffle } from "./cards";

const HAND_SIZE = 5;
const LINEUP_SIZE = 5;

export function newGame(): GameState {
  const deck = shuffle(getBaseDeck());
  const state: GameState = {
    turn: 1,
    phase: "setup",
    piles: { deck, hand: [], discard: [], lineup: [], destroyed: [] },
    power: 0,
    score: 0,
  };
  // initial setup (draw/refill) ...
  return state;
}


export function draw(state: GameState, n: number) {
  while (n-- > 0) {
    if (state.piles.deck.length === 0) {
      // reshuffle discard into deck
      state.piles.deck = shuffle(state.piles.discard);
      state.piles.discard = [];
      if (state.piles.deck.length === 0) return; // nothing to draw
    }
    const c = state.piles.deck.pop()!;
    state.piles.hand.push(c);
    // demo rule: power gained equals floor(cost/2)
    state.power += Math.floor(c.cost / 2);
  }
}

export function endTurn(state: GameState) {
  // discard hand
  state.piles.discard.push(...state.piles.hand);
  state.piles.hand = [];
  // next phase is buy (simple demo: allow buy once/turn)
  state.phase = 'buy';
}

export function canBuy(state: GameState, card: Card) {
  return state.phase === 'buy' && state.power >= card.cost;
}

export function buyFromLineup(state: GameState, cardId: string) {
  if (state.phase !== 'buy') return false;
  const idx = state.piles.lineup.findIndex(c => c.id === cardId);
  if (idx === -1) return false;
  const card = state.piles.lineup[idx];
  if (!canBuy(state, card)) return false;

  state.power -= card.cost;
  // for demo, purchased cards go straight to discard
  state.piles.discard.push(card);
  state.piles.lineup.splice(idx, 1);
  state.score += card.vp; // running score
  state.phase = 'refill';
  return true;
}

export function refillLineup(state: GameState) {
  while (state.piles.lineup.length < LINEUP_SIZE) {
    if (state.piles.deck.length === 0 && state.piles.discard.length > 0) {
      state.piles.deck = shuffle(state.piles.discard);
      state.piles.discard = [];
    }
    if (state.piles.deck.length === 0) break;
    state.piles.lineup.push(state.piles.deck.pop()!);
  }
}

export function nextTurn(state: GameState) {
  if (state.phase === 'refill') {
    refillLineup(state);
  }
  state.turn += 1;
  state.power = 0;
  draw(state, HAND_SIZE);
  state.phase = 'turn';
}

export function isGameOver(state: GameState) {
  // Demo end condition: deck + discard empty OR turn limit
  const noCards = state.piles.deck.length === 0 && state.piles.discard.length === 0;
  return noCards || state.turn > 10;
}
