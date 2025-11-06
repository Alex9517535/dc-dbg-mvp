// src/core/cards.ts
import type { Card } from './types';

let cardIdCounter = 0;

function generateCardId(): string {
  return `card_${cardIdCounter++}`;
}

export function createStarterDeck(): Card[] {
  const deck: Card[] = [];
  
  // 7 Punch cards
  for (let i = 0; i < 7; i++) {
    deck.push({
      id: generateCardId(),
      name: 'Punch',
      cost: 1,
      vp: 0,
      power: 1,
      type: 'starter',
      text: 'Basic attack card',
    });
  }
  
  // 3 Vulnerability cards
  for (let i = 0; i < 3; i++) {
    deck.push({
      id: generateCardId(),
      name: 'Vulnerability',
      cost: 0,
      vp: 0,
      power: 0,
      type: 'starter',
      text: 'Starter weakness',
    });
  }
  
  return deck;
}

export function createMainDeck(): Card[] {
  const deck: Card[] = [];
  
  // Equipment Cards (1 of each)
  const equipmentCards = [
    { name: "Aquaman's Trident", cost: 4, vp: 2, power: 2, text: "Legendary weapon of Aquaman" },
    { name: "Green Arrow's Bow", cost: 3, vp: 2, power: 1, text: "Precision ranged weapon" },
    { name: "Lasso of Truth", cost: 5, vp: 3, power: 2, text: "Wonder Woman's unbreakable lasso" },
    { name: "Nth Metal", cost: 6, vp: 4, power: 3, text: "Ancient alien metal" },
    { name: "Power Ring", cost: 7, vp: 5, power: 4, text: "Green Lantern's power source" },
    { name: "The Bat-Signal", cost: 2, vp: 1, power: 1, text: "Call for the Dark Knight" },
    { name: "The Batmobile", cost: 5, vp: 3, power: 3, text: "Batman's iconic vehicle" },
    { name: "The Cape and Cowl", cost: 3, vp: 2, power: 1, text: "Symbol of fear" },
    { name: "Utility Belt", cost: 4, vp: 2, power: 2, text: "Batman's essential gear" },
  ];
  
  equipmentCards.forEach(template => {
    // Add 4 copies of each equipment card to ensure enough for line-up
    for (let i = 0; i < 4; i++) {
      deck.push({
        id: generateCardId(),
        name: template.name,
        cost: template.cost,
        vp: template.vp,
        power: template.power,
        type: 'equipment',
        text: template.text,
      });
    }
  });
  
  // Kick - Super Power (add multiple copies)
  for (let i = 0; i < 8; i++) {
    deck.push({
      id: generateCardId(),
      name: 'Kick',
      cost: 2,
      vp: 1,
      power: 2,
      type: 'superpower',
      text: 'Enhanced combat move',
    });
  }
  
  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function to get card image path
export function getCardImagePath(cardName: string): string {
  const imageName = cardName
    .toLowerCase()
    .replace(/'/g, '')
    .replace(/\s+/g, '-');
  return `/cards/${imageName}.png`;
}