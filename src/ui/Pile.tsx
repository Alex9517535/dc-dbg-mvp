import type { Card } from '../core/types';
import CardView from './CardView';

type Props = {
  title: string;
  cards: Card[];
  onCardClick?: (id: string) => void;
  disableAll?: boolean;
};

export default function Pile({ title, cards, onCardClick, disableAll }: Props) {
  return (
    <section className="pile">
      <h3>{title} ({cards.length})</h3>
      <div className="row">
        {cards.map(c => (
          <CardView
            key={c.id}
            card={c}
            disabled={disableAll}
            onClick={onCardClick ? () => onCardClick(c.id) : undefined}
          />
        ))}
      </div>
    </section>
  );
}
