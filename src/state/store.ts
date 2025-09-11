import { create } from 'zustand';
import type { GameState } from '../core/types';
import { newGame, endTurn, buyFromLineup, nextTurn } from '../core/engine';

const KEY = 'dc-dbg-mvp-save';

type Actions = {
  reset: () => void;
  endTurn: () => void;
  buy: (cardId: string) => void;
  nextTurn: () => void;
  save: () => void;
  load: () => void;
};

const loadState = (): GameState | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as GameState) : null;
  } catch {
    return null;
  }
};

export const useGame = create<GameState & Actions>((set, get) => ({
  ...(loadState() ?? newGame()),
  reset: () => set(() => newGame()),
  endTurn: () => set(s => (endTurn(s), s)),
  buy: (cardId: string) => set(s => (buyFromLineup(s, cardId), s)),
  nextTurn: () => set(s => (nextTurn(s), s)),
  save: () => {
    const s = get();
    localStorage.setItem(KEY, JSON.stringify(s));
  },
  load: () => {
    const loaded = loadState();
    if (loaded) set(loaded);
  },
}));

// autosave on unload (optional)
window.addEventListener('beforeunload', () => {
  const s = useGame.getState();
  localStorage.setItem(KEY, JSON.stringify(s));
});
