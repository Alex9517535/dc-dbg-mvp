import type { Phase } from '../core/types';

const COLORS: Record<Phase, string> = {
  setup: '#7c3aed',
  turn:  '#22c55e',
  buy:   '#f59e0b',
  refill:'#38bdf8',
  end:   '#ef4444',
};

export default function PhaseIndicator({ phase }: { phase: Phase }) {
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '6px 10px',
        borderRadius: 8,
        border: '1px solid rgba(255,255,255,.15)',
        background: 'rgba(255,255,255,.06)',
      }}
      aria-live="polite"
    >
      <span style={{ opacity: .8, marginRight: 8 }}>Phase</span>
      <strong style={{ color: COLORS[phase] }}>{phase.toUpperCase()}</strong>
    </div>
  );
}
