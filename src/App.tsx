// src/App.tsx
import { useEffect } from 'react';
import { useGameStore } from './state/store';
import MenuScreen from './ui/MenuScreen';
import CardView from './ui/CardView';
import './styles.css';

function App() {
  const {
    phase,
    turn,
    power,
    score,
    deck,
    hand,
    discard,
    inPlay,
    lineup,
    mainDeck,
    supervillain,
    isOpponentTurn,
    startGame,
    playCard,
    buyCard,
    endTurn,
    continueFromOpponent,
    saveGame,
    loadGame,
    returnToMenu,
    newGame,
  } = useGameStore();

  // Handle spacebar for continuing from opponent turn
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === ' ' && isOpponentTurn) {
        e.preventDefault();
        continueFromOpponent();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpponentTurn, continueFromOpponent]);

  if (phase === 'menu') {
    return <MenuScreen onStart={startGame} />;
  }

  if (isOpponentTurn) {
    return (
      <div className="opponent-turn-screen">
        <div className="opponent-banner">
          <h1>OPPONENT'S TURN</h1>
          <p className="development-note">IN DEVELOPMENT</p>
          <p className="continue-prompt">Press <kbd>SPACEBAR</kbd> to continue</p>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <header className="game-header">
        <div className="header-left">
          <h1>DC Deck-Building MVP (Placeholder Assets)</h1>
          <div className="game-info">
            <span>Turn {turn}</span>
            <span>Phase: <strong style={{ color: '#4ade80' }}>TURN</strong></span>
            <span>Power: {power}</span>
            <span>Score: {score}</span>
          </div>
        </div>
        
        <div className="header-right">
          <div className="pile-counters">
            <div className="counter-item">
              <span className="counter-label">Deck:</span>
              <span className="counter-value">{deck.length}</span>
            </div>
            <div className="counter-item">
              <span className="counter-label">Hand:</span>
              <span className="counter-value">{hand.length}</span>
            </div>
            <div className="counter-item">
              <span className="counter-label">Discard:</span>
              <span className="counter-value">{discard.length}</span>
            </div>
          </div>
          <div className="game-controls">
            <button onClick={endTurn}>End Turn</button>
            <button onClick={saveGame}>Save</button>
            <button onClick={loadGame}>Load</button>
            <button onClick={newGame}>New Game</button>
            <button onClick={returnToMenu}>Return to Main Menu</button>
          </div>
        </div>
      </header>

      <main className="game-board">
        {/* Top Row: Supervillain, Main Deck, Discard */}
        <section className="top-piles-row">
          <div className="pile-spot">
            <h3>Supervillain</h3>
            <div className="card-spot supervillain-spot">
              {supervillain ? (
                <CardView card={supervillain} />
              ) : (
                <div className="card-back-container">
                  <img src="/cards/card-back.png" alt="Card Back" className="card-back-image" />
                  <div className="card-back-overlay">
                    <span className="card-back-text">No Supervillain</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="pile-spot">
            <h3>Main Deck</h3>
            <div className="card-spot main-deck-spot">
              <div className="card-back-container">
                <img src="/cards/card-back.png" alt="Card Back" className="card-back-image" />
                <div className="card-back-overlay">
                  <div className="deck-count-large">{mainDeck.length}</div>
                  <div className="deck-label">Cards</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pile-spot">
            <h3>Discard Pile</h3>
            <div className="card-spot discard-spot">
              {discard.length > 0 ? (
                <div className="discard-pile-display">
                  <CardView card={discard[discard.length - 1]} />
                  <div className="discard-count">{discard.length}</div>
                </div>
              ) : (
                <div className="empty-spot">
                  <span>Empty</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Line-up */}
        <section className="lineup-area">
          <h3>Line-Up ({lineup.length})</h3>
          <div className="card-row">
            {lineup.map((card, i) => (
              <CardView
                key={`${card.id}-${i}`}
                card={card}
                onClick={() => buyCard(card.id)}
              />
            ))}
          </div>
        </section>

        {/* In-Play Area */}
        <section className="inplay-area">
          <h3>In Play</h3>
          <div className="card-row">
            {inPlay.length === 0 ? (
              <div className="empty-area">Play cards here to generate power</div>
            ) : (
              inPlay.map((card, i) => (
                <CardView
                  key={`${card.id}-${i}`}
                  card={card}
                  isPlayed={true}
                />
              ))
            )}
          </div>
        </section>

        {/* Hand */}
        <section className="hand-area">
          <h3>Hand ({hand.length})</h3>
          <div className="card-row">
            {hand.map((card, i) => (
              <CardView
                key={`${card.id}-${i}`}
                card={card}
                onClick={() => playCard(card.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;