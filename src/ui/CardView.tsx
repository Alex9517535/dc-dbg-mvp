// src/ui/CardView.tsx
import { useState } from 'react';
import type { Card } from '../core/types';
import { getCardImagePath } from '../core/cards';
import './CardView.css';

interface CardViewProps {
  card: Card;
  onClick?: () => void;
  isPlayed?: boolean;
}

export default function CardView({ card, onClick, isPlayed }: CardViewProps) {
  const [isHovered, setIsHovered] = useState(false);
  const imagePath = getCardImagePath(card.name);

  return (
    <>
      <div
        className={`card ${isPlayed ? 'card-played' : ''} ${onClick ? 'card-clickable' : ''}`}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="card-image-container">
          <img 
            src={imagePath} 
            alt={card.name}
            className="card-image"
            onError={(e) => {
              // Fallback if image doesn't load
              e.currentTarget.src = '/cards/card-back.png';
            }}
          />
        </div>
      </div>

      {/* Enlarged hover card */}
      {isHovered && (
        <div className="card-hover-overlay">
          <div className="card-enlarged">
            <div className="card-enlarged-image">
              <img src={imagePath} alt={card.name} />
            </div>
            <div className="card-enlarged-details">
              <h3 className="card-enlarged-name">{card.name}</h3>
              <div className="card-enlarged-stats">
                <div className="stat-item">
                  <span className="stat-label">Cost:</span>
                  <span className="stat-value">{card.cost}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">VP:</span>
                  <span className="stat-value">{card.vp}</span>
                </div>
                {card.power !== undefined && (
                  <div className="stat-item">
                    <span className="stat-label">Power:</span>
                    <span className="stat-value">+{card.power}</span>
                  </div>
                )}
              </div>
              {card.text && (
                <div className="card-enlarged-text">
                  <p>{card.text}</p>
                </div>
              )}
              <div className="card-enlarged-type">
                <span className={`type-badge type-${card.type}`}>
                  {card.type.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}