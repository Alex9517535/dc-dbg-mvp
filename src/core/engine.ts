// src/core/engine.ts
import type { GameState, Card } from "./types";
import { getBaseDeck } from "../data/cards";
import { shuffle } from "./cards";

const HAND_SIZE = 5;
const LINEUP_SIZE = 5;

export function newGame(): GameState {
  // 1) Build & shuffle deck from your data/cards.ts “database”
  const deck = shuffle(getBaseDeck());

  const state: GameState = {
    turn: 1,
    phase: "setup",
    piles: { deck, hand: [], discard: [], lineup: [], destroyed: [] },
    power: 0,
    score: 0,
  };

  // 2) Initial lineup + starting hand
  refillLineup(state);
  draw(state, HAND_SIZE);

  // 3) Move to the first playable phase
  state.phase = "turn";
  return state;
}

export function draw(state: GameState, n: number) {
  while (n-- > 0) {
    if (state.piles.deck.length === 0) {
      // reshuffle discard into deck
      if (state.piles.discard.length === 0) break;
      state.piles.deck = shuffle(state.piles.discard);
      state.piles.discard = [];
    }
    const c = state.piles.deck.pop()!;
    state.piles.hand.push(c);
    // placeholder: gain some power based on cost
    state.power += Math.floor(c.cost / 2);
  }
}

export function endTurn(state: GameState) {
  if (state.phase !== "turn") return;
  state.piles.discard.push(...state.piles.hand);
  state.piles.hand = [];
  state.phase = "buy";
}

export function canBuy(state: GameState, card: Card) {
  return state.phase === "buy" && state.power >= card.cost;
}

export function buyFromLineup(state: GameState, cardId: string) {
  if (state.phase !== "buy") return false;
  const idx = state.piles.lineup.findIndex(c => c.id === cardId);
  if (idx === -1) return false;
  const card = state.piles.lineup[idx];
  if (!canBuy(state, card)) return false;

  state.power -= card.cost;
  state.piles.discard.push(card);
  state.piles.lineup.splice(idx, 1);
  state.score += card.vp;
  state.phase = "refill";
  return true;
}

export function refillLineup(state: GameState) {
  while (state.piles.lineup.length < LINEUP_SIZE) {
    if (state.piles.deck.length === 0) {
      if (state.piles.discard.length === 0) break;
      state.piles.deck = shuffle(state.piles.discard);
      state.piles.discard = [];
    }
    state.piles.lineup.push(state.piles.deck.pop()!);
  }
}

export function nextTurn(state: GameState) {
  if (state.phase !== "refill") return;
  refillLineup(state);
  state.turn += 1;
  state.power = 0;
  draw(state, HAND_SIZE);
  state.phase = "turn";
}

export function isGameOver(state: GameState) {
  const noCards = state.piles.deck.length === 0 && state.piles.discard.length === 0;
  return noCards || state.turn > 10;
}
