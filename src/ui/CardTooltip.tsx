import type { Card } from '../core/types';

export default function CardTooltip({ card }: { card: Card | null }) {
  if (!card) return null;
  return (
    <div
      role="tooltip"
      className="card-tooltip"
      style={{
        position: 'fixed',
        right: 12,
        bottom: 12,
        maxWidth: 320,
        background: '#0b1220',
        border: '1px solid #1f2937',
        borderRadius: 10,
        padding: '10px 12px',
        boxShadow: '0 8px 24px rgba(0,0,0,.35)',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      <div style={{ fontWeight: 800, marginBottom: 4 }}>{card.name}</div>
      <div style={{ fontSize: 12, color: '#93c5fd', marginBottom: 6 }}>
        Cost {card.cost} • VP {card.vp} {card.type ? `• ${card.type}` : ''}
      </div>
      <div style={{ fontSize: 13, color: '#cbd5e1' }}>
        {card.text ?? 'No special effect. (Placeholder)'}
      </div>
    </div>
  );
}
