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
  onReturnToMenu: () => void;
};

export default function Controls({
  turn,
  phase,
  power,
  score,
  onEndTurn,
  onNextTurn,
  onReset,
  onSave,
  onLoad,
  onReturnToMenu,
}: Props) {
  const canEndTurn = phase === 'turn';
  const canNextTurn = phase === 'refill';
  const canBuyPhase = phase === 'buy';

  return (
    <div className="controls" aria-label="Game controls">
      <div>
        Turn <strong>{turn}</strong> •{' '}
        Phase <strong>{phase}</strong> •{' '}
        Power <strong>{power}</strong> •{' '}
        Score <strong>{score}</strong>
        {canBuyPhase && (
          <span style={{ marginLeft: 8, opacity: 0.8 }}>
            (Select a Line-Up card to buy)
          </span>
        )}
      </div>

      <div className="buttons">
        <button
          type="button"
          onClick={onEndTurn}
          disabled={!canEndTurn}
          title="End the current turn"
        >
          End Turn
        </button>

        <button
          type="button"
          onClick={onNextTurn}
          disabled={!canNextTurn}
          title="Advance to next turn"
        >
          Next Turn
        </button>

        <button type="button" onClick={onSave} title="Save game to browser storage">
          Save
        </button>
        <button type="button" onClick={onLoad} title="Load game from browser storage">
          Load
        </button>
        <button type="button" onClick={onReset} title="Start a new game">
          New Game
        </button>
        <button type="button" onClick={onReturnToMenu} title="Return to the main menu">
          Return to Main Menu
        </button>
      </div>
    </div>
  );
}
