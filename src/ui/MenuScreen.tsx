// src/ui/MenuScreen.tsx
import { useState } from 'react';
import './MenuScreen.css';

interface Props {
  onStart: () => void;
}

export default function MenuScreen({ onStart }: Props) {
  const [showIntro, setShowIntro] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showCredits, setShowCredits] = useState(false);

  return (
    <div className="menu-screen">
      <div className="menu-container">
        <h1 className="menu-title">DC Deck-Building Game</h1>
        
        <div className="menu-buttons">
          <button className="menu-button primary" onClick={onStart}>
            ▶ Start Game
          </button>
          
          <button className="menu-button" onClick={() => setShowIntro(!showIntro)}>
            ▶ Introduction
          </button>
          {showIntro && (
            <div className="menu-panel">
              <p>Welcome to the DC Deck-Building Game MVP!</p>
              <p>Build your deck, generate power, and score victory points by purchasing powerful cards from the line-up.</p>
              <p>This is a single-player demonstration using placeholder assets only.</p>
            </div>
          )}
          
          <button className="menu-button" onClick={() => setShowSettings(!showSettings)}>
            ▶ Settings
          </button>
          {showSettings && (
            <div className="menu-panel">
              <p>Settings coming soon...</p>
              <p>Future options: Sound, Difficulty, Card Speed</p>
            </div>
          )}
          
          <button className="menu-button" onClick={() => setShowCredits(!showCredits)}>
            ▶ Credits
          </button>
          {showCredits && (
            <div className="menu-panel">
              <h3>Team Alpha</h3>
              <p>Ryan Arce</p>
              <p>Nathan Brown</p>
              <p>Arunbir Singh</p>
              <br />
              <p>CSC480A: Computer Science Capstone Project I</p>
              <p>National University — San Diego, CA</p>
              <p>Instructor: Dr. Jeffery S. Appel</p>
              <p>September 2025 Term</p>
            </div>
          )}
        </div>
        
        <p className="menu-hint">Press <kbd>Enter</kbd> to start</p>
      </div>
    </div>
  );
}