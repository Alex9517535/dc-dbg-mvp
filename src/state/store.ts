// src/state/store.ts
import { create } from 'zustand';
import type { GameState, Card, LogEntry } from '../core/types';
import { newGame, endTurn, buyFromLineup, nextTurn } from '../core/engine';

// bump this whenever the saved shape / deck data changes
const KEY = 'dc-dbg-mvp-save-v5';

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

    const looksValid =
      p &&
      Array.isArray(p.deck) &&
      Array.isArray(p.hand) &&
      Array.isArray(p.discard) &&
      Array.isArray(p.lineup) &&
      [p.deck[0], p.lineup[0], p.hand[0]].filter(Boolean).every(okCard);

    return looksValid ? parsed : null;
  } catch {
    return null;
  }
};

type Actions = {
  reset: () => void;
  endTurn: () => void;
  buy: (cardId: string) => void;
  nextTurn: () => void;
  save: () => void;
  load: () => void;

  // UI slice
  setUiShowMenu: (show: boolean) => void;
  startNewFromMenu: () => void;

  // NEW: diagnostics / UI
  addLog: (entry: Omit<LogEntry, 'id' | 'ts' | 'turn' | 'phase'>) => void;
  clearLog: () => void;
  setShowLogPanel: (show: boolean) => void;
  setHoveredCard: (card: Card | null) => void;
};

type Store = GameState & {
  uiShowMenu: boolean;

  // NEW: UI + diagnostics
  actionLog: LogEntry[];
  showLogPanel: boolean;
  hoveredCard: Card | null;
} & Actions;

// ---- store ----
export const useGame = create<Store>((set, get) => {
  const initial = loadStateValidated() ?? newGame();

  const mkLog = (partial: Omit<LogEntry, 'id' | 'ts' | 'turn' | 'phase'>): LogEntry => {
    const s = get();
    return {
      id: (globalThis.crypto?.randomUUID?.() ?? `log_${Date.now()}_${Math.random().toString(36).slice(2)}`),
      ts: Date.now(),
      turn: s.turn,
      phase: s.phase,
      ...partial,
    };
  };

  return {
    ...initial,
    uiShowMenu: true,

    // NEW defaults
    actionLog: [],
    showLogPanel: false,
    hoveredCard: null,

    addLog: (partial) =>
      set((s) => {
        s.actionLog.push(mkLog(partial));
        return s;
      }),

    clearLog: () => set({ actionLog: [] }),

    setShowLogPanel: (show) => set({ showLogPanel: show }),

    setHoveredCard: (card) => set({ hoveredCard: card }),

    reset: () =>
      set((s) => {
        const next = newGame();
        const entry = {
          id: (globalThis.crypto?.randomUUID?.() ?? `log_${Date.now()}_${Math.random().toString(36).slice(2)}`),
          ts: Date.now(),
          turn: next.turn,
          phase: next.phase,
          kind: 'game/start' as const,
          msg: 'New game started',
        };
        return { ...next, actionLog: [...s.actionLog, entry], showLogPanel: s.showLogPanel, hoveredCard: null };
      }),

    endTurn: () =>
      set((s) => {
        s.actionLog.push(mkLog({ kind: 'turn/end', msg: 'End Turn clicked' }));
        endTurn(s);
        return s;
      }),

    buy: (cardId: string) =>
      set((s) => {
        const card = s.piles.lineup.find((c) => c.id === cardId);
        if (!card) return s;
        s.actionLog.push(mkLog({
          kind: 'buy/attempt',
          msg: `Attempt to buy ${card.name} (cost ${card.cost})`,
          data: { cardId }
        }));
        const ok = buyFromLineup(s, cardId);
        if (ok) {
          s.actionLog.push(mkLog({
            kind: 'buy/success',
            msg: `Purchased ${card.name}; power now ${s.power}`,
            data: { cardId, newPower: s.power, score: s.score }
          }));
        }
        return s;
      }),

    nextTurn: () =>
      set((s) => {
        s.actionLog.push(mkLog({ kind: 'turn/next', msg: 'Proceed to next turn' }));
        nextTurn(s);
        return s;
      }),

    save: () => {
      const {
        uiShowMenu, setUiShowMenu, startNewFromMenu,
        addLog, clearLog, setShowLogPanel, setHoveredCard, // eslint-disable-line @typescript-eslint/no-unused-vars
        ...gameOnly
      } = get();
      localStorage.setItem(KEY, JSON.stringify(gameOnly));
      set((s) => (s.actionLog.push(mkLog({ kind: 'save', msg: 'Game saved to localStorage' })), s));
    },

    load: () => {
      const loaded = loadStateValidated();
      if (loaded) {
        set((s) => ({
          ...loaded,
          actionLog: [...s.actionLog, mkLog({ kind: 'load', msg: 'Game loaded from localStorage' })],
          showLogPanel: s.showLogPanel,
          hoveredCard: null,
        }));
      }
    },

    setUiShowMenu: (show: boolean) =>
      set((s) => {
        s.actionLog.push(mkLog({ kind: show ? 'menu/show' : 'menu/hide', msg: `Menu ${show ? 'shown' : 'hidden'}` }));
        return { uiShowMenu: show };
      }),

    startNewFromMenu: () =>
      set(() => {
        const fresh = newGame();
        return { ...fresh, uiShowMenu: false };
      }),
  };
});

// autosave on unload (game state only)
window.addEventListener('beforeunload', () => {
  const {
    uiShowMenu, setUiShowMenu, startNewFromMenu,
    addLog, clearLog, setShowLogPanel, setHoveredCard,
    ...gameOnly
  } = useGame.getState() as any;
  localStorage.setItem(KEY, JSON.stringify(gameOnly));
});
