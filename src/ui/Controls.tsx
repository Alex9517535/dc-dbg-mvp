// src/ui/Controls.tsx
type Props = {
  turn: number;
  phase: 'setup' | 'turn' | 'buy' | 'refill' | 'end';
  power: number;
  score: number;
  onEndTurn: () => void;
  onNextTurn: () => void;
  onReset: () => void;
  onSave: () => void;
  onLoad: () => void;
  onReturnToMenu: () => void;   // NEW
};

export default function Controls(p: Props) {
  const canEndTurn = p.phase === 'turn';
  const canNextTurn = p.phase === 'refill';

  return (
    <div className="controls" aria-label="Game controls">
      <div>
        Turn <strong>{p.turn}</strong> •{' '}
        Phase <strong>{p.phase}</strong> •{' '}
        Power <strong>{p.power}</strong> •{' '}
        Score <strong>{p.score}</strong>
        {p.phase === 'buy' && (
          <span style={{ marginLeft: 8, opacity: 0.8 }}>
            (Select a Line-Up card to buy)
          </span>
        )}
      </div>

      <div className="buttons">
        <button onClick={p.onEndTurn} disabled={!canEndTurn} title="End the current turn">
          End Turn
        </button>

        <button onClick={p.onNextTurn} disabled={!canNextTurn} title="Advance to next turn">
          Next Turn
        </button>

        <button onClick={p.onSave} title="Save game to browser storage">Save</button>
        <button onClick={p.onLoad} title="Load game from browser storage">Load</button>
        <button onClick={p.onReset} title="Start a new game">New Game</button>

        <button onClick={p.onReturnToMenu} title="Return to the main menu">
          Return to Main Menu
        </button>
      </div>
    </div>
  );
}
