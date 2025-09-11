import { useState } from "react";
import type { Card } from "../core/types";

type Props = {
  card: Card;
  onClick?: () => void;     // buy action
  disabled?: boolean;       // disable buying, but not viewing
};

export default function CardView({ card, onClick, disabled }: Props) {
  const [showModal, setShowModal] = useState(false);

  // Handle clicks: always open modal, but only call onClick if allowed
  const handleClick = () => {
    setShowModal(true);
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
        >
          <div
            className="card-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="card-large">
              <div className="card-name">{card.name}</div>
              <div className="card-meta">
                Cost {card.cost} • VP {card.vp}
              </div>
            </div>
            <button className="close-btn" onClick={() => setShowModal(false)}>
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
