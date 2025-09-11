import { useState } from "react";
import type { Card } from "../core/types";

type Props = {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
};

export default function CardView({ card, onClick, disabled }: Props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        disabled={disabled}
        className="card"
        title={`Cost: ${card.cost} | VP: ${card.vp}`}
      >
        <div className="card-name">{card.name}</div>
        <div className="card-meta">
          Cost {card.cost} • VP {card.vp}
        </div>
      </button>

      {showModal && (
        <div className="card-modal-backdrop" onClick={() => setShowModal(false)}>
          <div
            className="card-modal"
            onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
          >
            <div className="card-large">
              <div className="card-name">{card.name}</div>
              <div className="card-meta">
                Cost {card.cost} • VP {card.vp}
              </div>
            </div>
            <button
              className="close-btn"
              onClick={() => setShowModal(false)}
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
