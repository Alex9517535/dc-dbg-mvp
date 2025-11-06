// src/state/store.ts
import { create } from 'zustand';
import type { GameState, Card } from '../core/types';
import { createStarterDeck, createMainDeck, shuffleDeck } from '../core/cards';

interface GameStore extends GameState {
  // Actions
  startGame: () => void;
  drawCards: (count: number) => void;
  playCard: (cardId: string) => void;
  buyCard: (cardId: string) => void;
  endTurn: () => void;
  continueFromOpponent: () => void;
  saveGame: () => void;
  loadGame: () => void;
  returnToMenu: () => void;
  newGame: () => void;
}

const initialState: GameState = {
  phase: 'menu',
  turn: 1,
  power: 0,
  score: 0,
  deck: [],
  hand: [],
  discard: [],
  inPlay: [],
  lineup: [],
  mainDeck: [],
  supervillain: null,
  isOpponentTurn: false,
  canDrawCards: true,
};

export const useGameStore = create<GameStore>((set, get) => ({
  ...initialState,

  startGame: () => {
    const deck = shuffleDeck(createStarterDeck());
    const mainDeck = shuffleDeck(createMainDeck());
    const lineup = mainDeck.splice(0, 5);
    
    set({
      phase: 'turn',
      turn: 1,
      power: 0,
      score: 0,
      deck,
      hand: [],
      discard: [],
      inPlay: [],
      lineup,
      mainDeck,
      supervillain: null,
      isOpponentTurn: false,
      canDrawCards: true,
    });
    
    // Auto-draw starting hand
    get().drawCards(5);
  },

  drawCards: (count: number) => {
    const state = get();
    let { deck, hand, discard } = state;
    
    for (let i = 0; i < count; i++) {
      if (deck.length === 0 && discard.length > 0) {
        // Shuffle discard into deck
        deck = shuffleDeck([...discard]);
        discard = [];
      }
      
      if (deck.length > 0) {
        const card = deck.pop()!;
        hand.push(card);
      }
    }
    
    set({ deck: [...deck], hand: [...hand], discard: [...discard], canDrawCards: false });
  },

  playCard: (cardId: string) => {
    const state = get();
    const cardIndex = state.hand.findIndex(c => c.id === cardId);
    
    if (cardIndex === -1) return;
    
    const card = state.hand[cardIndex];
    const newHand = state.hand.filter((_, i) => i !== cardIndex);
    const newInPlay = [...state.inPlay, card];
    const newPower = state.power + (card.power || 0);
    
    set({
      hand: newHand,
      inPlay: newInPlay,
      power: newPower,
    });
  },

  buyCard: (cardId: string) => {
    const state = get();
    const cardIndex = state.lineup.findIndex(c => c.id === cardId);
    
    if (cardIndex === -1) return;
    
    const card = state.lineup[cardIndex];
    
    if (state.power < card.cost) return;
    
    // Buy the card
    const newPower = state.power - card.cost;
    const newScore = state.score + card.vp;
    const newDiscard = [...state.discard, card];
    
    // Refill lineup
    let newLineup = [...state.lineup];
    let newMainDeck = [...state.mainDeck];
    
    if (newMainDeck.length > 0) {
      const newCard = newMainDeck.pop()!;
      newLineup[cardIndex] = newCard;
    } else {
      newLineup.splice(cardIndex, 1);
    }
    
    set({
      power: newPower,
      score: newScore,
      discard: newDiscard,
      lineup: newLineup,
      mainDeck: newMainDeck,
    });
  },

  endTurn: () => {
    const state = get();
    
    // Move all cards from hand and in-play to discard
    const newDiscard = [...state.discard, ...state.hand, ...state.inPlay];
    
    set({
      hand: [],
      inPlay: [],
      discard: newDiscard,
      power: 0,
      phase: 'opponent',
      isOpponentTurn: true,
    });
  },

  continueFromOpponent: () => {
    const state = get();
    
    set({
      phase: 'turn',
      turn: state.turn + 1,
      isOpponentTurn: false,
      canDrawCards: true,
    });
    
    // Auto-draw 5 cards for next turn
    get().drawCards(5);
  },

  saveGame: () => {
    const state = get();
    const saveData = {
      phase: state.phase,
      turn: state.turn,
      power: state.power,
      score: state.score,
      deck: state.deck,
      hand: state.hand,
      discard: state.discard,
      inPlay: state.inPlay,
      lineup: state.lineup,
      mainDeck: state.mainDeck,
      supervillain: state.supervillain,
      isOpponentTurn: state.isOpponentTurn,
      canDrawCards: state.canDrawCards,
    };
    localStorage.setItem('dc-dbg-save', JSON.stringify(saveData));
    alert('Game saved!');
  },

  loadGame: () => {
    const saveData = localStorage.getItem('dc-dbg-save');
    if (saveData) {
      const parsed = JSON.parse(saveData);
      set(parsed);
      alert('Game loaded!');
    } else {
      alert('No saved game found!');
    }
  },

  returnToMenu: () => {
    set({ phase: 'menu' });
  },

  newGame: () => {
    set(initialState);
    get().startGame();
  },
}));