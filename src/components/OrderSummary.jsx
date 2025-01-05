import React from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css';

function OrderSummary({ order }) {
  const navigate = useNavigate();

  // Get the delivery info from the first item (since all items share the same delivery details)
  const deliveryInfo = order.items[0]?.address;
  const deliveryTime = order.items[0]?.deliveryTime;

  const formatDate = (dateString) => {
    if (!dateString) return 'No delivery time selected';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  return (
    <div className="order-summary">
      <h2>Order Summary</h2>
      
      {/* Pizza Items */}
      <div className="order-items">
        {order.items.map((item, index) => (
          <div key={index} className="order-item">
            <h3>{item.pizza.name} × {item.quantity}</h3>
            <p className="toppings">
              {item.toppings.length > 0 
                ? `Extra Toppings: ${item.toppings.map(t => t.name).join(', ')}` 
                : 'No extra toppings'}
            </p>
            <p className="item-price">€{item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="order-total">
        <h3>Total Price: €{order.totalPrice.toFixed(2)}</h3>
      </div>

      <button 
        className="proceed-button"
        onClick={() => navigate('/payment')}
      >Proceed to Payment </button>
    </div>
  );
}

export default OrderSummary; 