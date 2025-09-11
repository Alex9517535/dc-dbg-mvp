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

  // UI slice
  setUiShowMenu: (show: boolean) => void;
};

type Store = GameState & {
  uiShowMenu: boolean;
} & Actions;

const loadState = (): GameState | null => {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as GameState) : null;
  } catch {
    return null;
  }
};

export const useGame = create<Store>((set, get) => ({
  ...(loadState() ?? newGame()),
  uiShowMenu: true,

  reset: () => set(() => ({ ...newGame() })),
  endTurn: () => set(s => (endTurn(s), s)),
  buy: (cardId: string) => set(s => (buyFromLineup(s, cardId), s)),
  nextTurn: () => set(s => (nextTurn(s), s)),
  save: () => {
    const { uiShowMenu, setUiShowMenu, ...gameOnly } = get();
    localStorage.setItem(KEY, JSON.stringify(gameOnly));
  },
  load: () => {
    const loaded = loadState();
    if (loaded) set({ ...loaded });
  },

  setUiShowMenu: (show: boolean) => set({ uiShowMenu: show }),
}));

// (optional) autosave on unload
window.addEventListener('beforeunload', () => {
  const { uiShowMenu, setUiShowMenu, ...gameOnly } = useGame.getState();
  localStorage.setItem(KEY, JSON.stringify(gameOnly));
});
