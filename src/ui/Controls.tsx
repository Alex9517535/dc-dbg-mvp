type Props = {
  turn: number;
  phase: string;
  power: number;
  score: number;
  onEndTurn: () => void;
  onNextTurn: () => void;
  onReset: () => void;
  onSave: () => void;
  onLoad: () => void;
};

export default function Controls(p: Props) {
  return (
    <div className="controls">
      <div>Turn <strong>{p.turn}</strong> • Phase <strong>{p.phase}</strong> • Power <strong>{p.power}</strong> • Score <strong>{p.score}</strong></div>
      <div className="buttons">
        <button onClick={p.onEndTurn}>End Turn</button>
        <button onClick={p.onNextTurn}>Next Turn</button>
        <button onClick={p.onSave}>Save</button>
        <button onClick={p.onLoad}>Load</button>
        <button onClick={p.onReset}>New Game</button>
      </div>
    </div>
  );
}
