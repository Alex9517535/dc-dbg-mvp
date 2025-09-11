import { useEffect } from 'react';

type Props = {
  onStart: () => void;
};

export default function MenuScreen({ onStart }: Props) {
  // Allow pressing Enter/Space to start
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') onStart();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onStart]);

  return (
    <div className="menu-bg">
      <div className="menu-overlay" />
      <div className="menu-container" role="dialog" aria-labelledby="menu-title" aria-modal="true">
        <h1 id="menu-title" className="menu-title">Cerberus Deck-Builder</h1>
        <p className="menu-subtitle">Browser MVP • Placeholder Assets</p>

        <div className="menu-buttons">
          <button className="btn-primary" onClick={onStart} aria-label="Start Demo (Enter)">
            ▶ Start Demo
          </button>
          <details className="menu-details">
            <summary>How to Play</summary>
            <div className="menu-panel">
              <p>
                This MVP demonstrates a **one-player** core loop:
                <em> setup → turns → buy → lineup refill → score</em>. Use the
                UI buttons in-game to end turn, buy from the line-up, and go to the next turn.
              </p>
              <ul>
                <li>Buy cards when the phase is <strong>buy</strong> and you have enough power.</li>
                <li>Score increases by VP of purchased cards (placeholder rule).</li>
                <li>Demo ends after 10 turns or when the deck is exhausted.</li>
              </ul>
            </div>
          </details>

          <details className="menu-details">
            <summary>Settings</summary>
            <div className="menu-panel">
              <label className="menu-row">
                <input type="checkbox" disabled /> Music (N/A in MVP)
              </label>
              <label className="menu-row">
                <input type="checkbox" defaultChecked /> Reduced motion
              </label>
            </div>
          </details>

          <details className="menu-details">
            <summary>Credits</summary>
            <div className="menu-panel">
              <p>Team Alpha — Ryan Arce • Nathan Brown • Arunbir Singh</p>
              <p>Course: CSC480A — Project Proposal MVP</p>
              <p>All art/text are placeholders (no licensed assets).</p>
            </div>
          </details>
        </div>

        <p className="menu-hint">Press <kbd>Enter</kbd> to start</p>
      </div>

      {/* Ambient floating shapes (pure CSS) */}
      <div className="bg-orb orb1" />
      <div className="bg-orb orb2" />
      <div className="bg-orb orb3" />
    </div>
  );
}
