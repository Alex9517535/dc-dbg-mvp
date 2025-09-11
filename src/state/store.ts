// src/state/store.ts
import { create } from 'zustand';
import type { GameState, Card } from '../core/types';
import { newGame, endTurn, buyFromLineup, nextTurn } from '../core/engine';

// bump this whenever the saved shape / deck data changes
const KEY = 'dc-dbg-mvp-save-v4';

type Actions = {
  reset: () => void;
  endTurn: () => void;
  buy: (cardId: string) => void;
  nextTurn: () => void;
  save: () => void;
  load: () => void;

  // UI slice
  setUiShowMenu: (show: boolean) => void;
  startNewFromMenu: () => void; // convenience: reset + hide menu
};

type Store = GameState & {
  uiShowMenu: boolean;
} & Actions;

// ---- validation to ignore stale/corrupt saves ----
const okCard = (c: any): c is Card =>
  c &&
  typeof c.id === 'string' &&
  typeof c.name === 'string' &&
  typeof c.cost === 'number' &&
  typeof c.vp === 'number';

const loadStateValidated = (): GameState | null => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as GameState;
    const p = parsed?.piles;

    // quick sanity checks: piles exist, arrays, and a few cards look valid
    const looksValid =
      p &&
      Array.isArray(p.deck) &&
      Array.isArray(p.hand) &&
      Array.isArray(p.discard) &&
      Array.isArray(p.lineup) &&
      // sample a few spots; cheap and effective
      [p.deck[0], p.lineup[0], p.hand[0]].filter(Boolean).every(okCard);

    return looksValid ? parsed : null;
  } catch {
    return null;
  }
};

// ---- store ----
export const useGame = create<Store>((set, get) => {
  const initial = loadStateValidated() ?? newGame();

  return {
    ...initial,
    uiShowMenu: true,

    reset: () => set(() => ({ ...newGame() })),
    endTurn: () => set(s => (endTurn(s), s)),
    buy: (cardId: string) => set(s => (buyFromLineup(s, cardId), s)),
    nextTurn: () => set(s => (nextTurn(s), s)),

    save: () => {
      // exclude UI fields from the save
      const { uiShowMenu, setUiShowMenu, startNewFromMenu, ...gameOnly } = get();
      localStorage.setItem(KEY, JSON.stringify(gameOnly));
    },

    load: () => {
      const loaded = loadStateValidated();
      if (loaded) set({ ...loaded });
    },

    setUiShowMenu: (show: boolean) => set({ uiShowMenu: show }),

    // convenience for your Start button
    startNewFromMenu: () =>
      set(() => {
        const fresh = newGame();
        return { ...fresh, uiShowMenu: false };
      }),
  };
});

// autosave on unload (game state only)
window.addEventListener('beforeunload', () => {
  const { uiShowMenu, setUiShowMenu, startNewFromMenu, ...gameOnly } = useGame.getState();
  localStorage.setItem(KEY, JSON.stringify(gameOnly));
});
