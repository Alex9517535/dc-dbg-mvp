import type { Card } from '../core/types';

type Props = {
  card: Card;
  onClick?: () => void;
  disabled?: boolean;
};

export default function CardView({ card, onClick, disabled }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="card"
      title={`Cost: ${card.cost} | VP: ${card.vp}`}
    >
      <div className="card-name">{card.name}</div>
      <div className="card-meta">Cost {card.cost} • VP {card.vp}</div>
    </button>
  );
}
