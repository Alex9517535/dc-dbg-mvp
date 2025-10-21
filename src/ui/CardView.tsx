import { useState } from "react";
import type { Card } from "../core/types";
import { useGame } from "../state/store";

type Props = {
  card: Card;
  onClick?: () => void;     // buy action
  disabled?: boolean;       // disable buying, but not viewing
};

export default function CardView({ card, onClick, disabled }: Props) {
  const [showModal, setShowModal] = useState(false);
  const setHoveredCard = useGame(s => s.setHoveredCard);
  const addLog = useGame(s => s.addLog);

  // Handle clicks: always open modal, but only call onClick if allowed
  const handleClick = () => {
    setShowModal(true);
    addLog?.({ kind: 'card/view', msg: `Viewed ${card.name}`, data: { id: card.id } });
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <>
      <div
        className="card"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        title={`Cost: ${card.cost} | VP: ${card.vp}`}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        onMouseEnter={() => setHoveredCard(card)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <div className="card-name">{card.name}</div>
        <div className="card-meta">
          Cost {card.cost} • VP {card.vp}
        </div>
      </div>

      {showModal && (
        <div
          className="card-modal-backdrop"
          onClick={() => setShowModal(false)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="card-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-large" aria-live="polite">
              <div className="card-name">{card.name}</div>
              <div className="card-meta">
                Cost {card.cost} • VP {card.vp}
              </div>
            </div>
            <button className="close-btn" onClick={() => setShowModal(false)} aria-label="Close card">
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
