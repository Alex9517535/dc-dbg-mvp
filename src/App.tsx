import './styles.css';
import { useGame } from './state/store';
import Pile from './ui/Pile';
import Controls from './ui/Controls';
import { isGameOver } from './core/engine';
import MenuScreen from './ui/MenuScreen';

import PhaseIndicator from './ui/PhaseIndicator';            
import RulesReferencePanel from './ui/RulesReferencePanel';  
import ActionLogPanel from './ui/ActionLogPanel';            
import CardTooltip from './ui/CardTooltip';              

export default function App() {
  const g = useGame();
  const showMenu = g.uiShowMenu;

  if (showMenu) {
    return (
      <MenuScreen
        onStart={() => {
          useGame.getState().reset();
          useGame.getState().setUiShowMenu(false);
        }}
      />
    );
  }

  const gameOver = isGameOver(g);

  return (
    <div className="game-board">
      <main className="container">
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <h1>DC Deck-Building MVP (Placeholder Assets)</h1>
          <PhaseIndicator phase={g.phase} />
        </header>

        {gameOver && (
          <div className="banner">Game Over • Final Score: {g.score}</div>
        )}

        <Controls
          turn={g.turn}
          phase={g.phase}
          power={g.power}
          score={g.score}
          onEndTurn={() => useGame.getState().endTurn()}
          onNextTurn={() => useGame.getState().nextTurn()}
          onReset={() => useGame.getState().reset()}
          onSave={() => useGame.getState().save()}
          onLoad={() => useGame.getState().load()}
          onReturnToMenu={() => useGame.getState().setUiShowMenu(true)}
        />

        <RulesReferencePanel />

        <Pile
          title="Line-Up"
          cards={g.piles.lineup}
          onCardClick={(id) => useGame.getState().buy(id)}
          disableAll={g.phase !== "buy"}
        />

        <section className="row-summaries">
          <div className="summary">Deck: {g.piles.deck.length}</div>
          <div className="summary">Discard: {g.piles.discard.length}</div>
        </section>

        <Pile title="Hand" cards={g.piles.hand} disableAll />

        <details className="menu-details" style={{ marginTop: 12 }}>
          <summary>Show Action Log</summary>
          <div className="menu-panel">
            <ActionLogPanel />
          </div>
        </details>

        <CardTooltip card={g.hoveredCard} />
      </main>
    </div>
  );
}
