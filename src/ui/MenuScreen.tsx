import { useEffect } from 'react';

type Props = {
  onStart: () => void;
};

export default function MenuScreen({ onStart }: Props) {
 {/* Allow pressing Enter/Space to start */}
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
        
        {/* DC Deck-Building Game Button */}
        <h1 id="menu-title" className="menu-title">DC Deck-Building Game</h1>
        <h1><p></p></h1>

        {/* Start Game Button */}
        <div className="menu-buttons">
          <button className="btn-primary" onClick={onStart} aria-label="Start Demo (Enter)">
            ▶ Start Game
          </button>
          <details className="menu-details">

            {/* Introduction Button */}
            <summary>Introduction</summary>
            <div className="menu-panel">
              <p>
                This is a minimal viable product (MVP) for the DC deck-building game, that demonstrates the core loop: <em> setup - turns - buy - lineup refill - score. </em>
                Click the Start Demo button above to get started.
                 Use the UI buttons in-game to end turn, buy from the line-up, and go to the next turn.
              </p>
              <ul>
                <li>Buy cards when the phase is <strong>buy</strong> and you have enough power.</li>
                <li>Score increases by VP of purchased cards (placeholder rule).</li>
                <li>Demo ends after 10 turns or when the deck is exhausted.</li>
              </ul>
            </div>
          </details>

          {/* Settings Button */}  
          <details className="menu-details">
            <summary>Settings</summary>
            <div className="menu-panel">
              <label className="menu-row">
                <input type="checkbox" defaultChecked /> Music (Placeholder only)
              </label>
              <label className="menu-row">
                <input type="checkbox" defaultChecked /> Sound Effects (Placeholder only) 
              </label>
            </div>
          </details>

          {/* Credits Button */}
          <details className="menu-details">
            <summary>Credits</summary>
            <div className="menu-panel">
              <p><em>Team Alpha: Ryan Arce, Nathan Brown and Arunbir Singh</em></p>
              <p>Course: CSC480A — Project Proposal MVP</p>
              <p>All art/text are placeholders.</p>
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
