import React, { useState } from 'react';
import { toppings } from '../data/pizzaData';
import './Customization.css';

function Customization({ pizza, onClose, onAddToOrder }) {
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [deliveryTime, setDeliveryTime] = useState('');
  const [address, setAddress] = useState({
    street: '',
    number: '',
    city: ''
  });

  const calculatePrice = () => {
    const basePrice = pizza.basePrice;
    const toppingsPrice = selectedToppings.reduce((sum, topping) => sum + topping.price, 0);
    return (basePrice + toppingsPrice) * quantity;
  };

  const handleAddToOrder = () => {
    const orderItem = {
      pizza,
      toppings: selectedToppings,
      quantity,
      price: calculatePrice(),
      deliveryTime,
      address
    };
    onAddToOrder(orderItem);
    onClose();
  };

  return (
    <div className="customization-content">
      <img 
        src={`/images/${pizza.image}`} 
        alt={pizza.name}
        className="pizza-modal-image"
      />
      
      <h2>{pizza.name}</h2>
      
      <div className="quantity-selector">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          disabled={quantity === 1}
        > - </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity(quantity + 1)}>+</button>
      </div>

      <div className="toppings-section">
        <h2>Add Toppings:</h2>
        {toppings.map(topping => (
          <label key={topping.id}>
            <input
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedToppings([...selectedToppings, topping]);
                } else {
                  setSelectedToppings(selectedToppings.filter(t => t.id !== topping.id));
                }
              }}
            />
            {topping.name} ({topping.price}€)
          </label>
        ))}
      </div>

      {/* <div className="price-section">
        <h3>Total Price: {calculatePrice().toFixed(2)}€</h3>
      </div> */}

      <button 
        className="add-to-order-btn"
        onClick={handleAddToOrder}
      >
        Add to Order {calculatePrice().toFixed(2)}€
      </button>
    </div>
  );
}

export default Customization; 