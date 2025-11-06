// src/core/types.ts

export type CardType = 'starter' | 'hero' | 'villain' | 'equipment' | 'superpower';

export interface Card {
  id: string;
  name: string;
  cost: number;
  vp: number;
  power?: number;
  type: CardType;
  text?: string;
}

export type Phase = 'menu' | 'setup' | 'turn' | 'opponent' | 'end';

export interface GameState {
  phase: Phase;
  turn: number;
  power: number;
  score: number;
  
  // Player areas
  deck: Card[];
  hand: Card[];
  discard: Card[];
  inPlay: Card[];
  
  // Shared areas
  lineup: Card[];
  mainDeck: Card[];
  supervillain: Card | null;
  
  // Game flow
  isOpponentTurn: boolean;
  canDrawCards: boolean;
}