import React from 'react';
import './PizzaCard.css';

function PizzaCard({ pizza, onSelect }) {
  return (
    <div className="pizza-card">
      <img 
        src={`/images/${pizza.image}`} 
        alt={pizza.name}
        className="pizza-image"
      />
      <div className="pizza-info">
        <h3>{pizza.name}</h3>
        <p className="description">{pizza.description}</p>
        <p className="price">{pizza.basePrice.toFixed(2)}€</p>
        <button 
          onClick={onSelect}
          className="customize-button"
        >
          Add to Order
        </button>
      </div>
    </div>
  );
}

export default PizzaCard; 