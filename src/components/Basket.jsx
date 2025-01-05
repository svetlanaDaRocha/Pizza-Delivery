import React from 'react';
import './Basket.css';

function Basket({ order, isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="basket-sidebar">
      <button className="close-basket" onClick={onClose}>×</button>
      <h2>Your Order</h2>
      {order.items.map((item, index) => (
        <div key={index} className="basket-item">
          <h3>{item.pizza.name} × {item.quantity}</h3>
          <p>Toppings: {item.toppings.map(t => t.name).join(', ') || 'No extra toppings'}</p>
          <p>{item.price.toFixed(2)}€</p>
        </div>
      ))}
      <div className="basket-total">
        <h4>Total: {order.totalPrice.toFixed(2)}€</h4>
      </div>
    </div>
  );
}

export default Basket; 