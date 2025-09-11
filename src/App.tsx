import './styles.css';
import { useGame } from './state/store';
import Pile from './ui/Pile';
import Controls from './ui/Controls';
import { isGameOver } from './core/engine';
import MenuScreen from './ui/MenuScreen';

export default function App() {
  const g = useGame();
  const showMenu = g.uiShowMenu;

if (showMenu) {
  return (
    <MenuScreen
      onStart={() => {
        // start a fresh game each time "Start Game" is pressed
        useGame.getState().reset();          // makes a new shuffled deck
        useGame.getState().setUiShowMenu(false); // hides the menu
      }}
    />
  );
}


  const gameOver = isGameOver(g);

  return (
    <main className="container">
      <h1>DC Deck-Building MVP (Placeholder Assets)</h1>

      {gameOver && <div className="banner">Game Over • Final Score: {g.score}</div>}

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

      <Pile
        title="Line-Up"
        cards={g.piles.lineup}
        onCardClick={(id) => useGame.getState().buy(id)}
        disableAll={g.phase !== 'buy'}
      />

      <section className="row-summaries">
        <div className="summary">Deck: {g.piles.deck.length}</div>
        <div className="summary">Discard: {g.piles.discard.length}</div>
      </section>

      <Pile title="Hand" cards={g.piles.hand} disableAll />
    </main>
  );
}
