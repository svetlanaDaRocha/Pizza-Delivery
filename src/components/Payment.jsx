import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import './Payment.css';

function Payment({ order, onOrderComplete }) {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryDateTime, setDeliveryDateTime] = useState('');
  const [formErrors, setFormErrors] = useState({});
  
  // State for credit card
  const [state, setState] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const [orderComplete, setOrderComplete] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!deliveryAddress.trim()) {
      errors.address = 'Delivery address is required';
    }
    
    if (!deliveryDateTime) {
      errors.datetime = 'Delivery date and time are required';
    }
    
    if (!paymentMethod) {
      errors.paymentMethod = 'Please select a payment method';
    }

    // Validate card details if credit/debit card is selected
    if ((paymentMethod === 'credit' || paymentMethod === 'debit')) {
      if (!state.number || state.number.length !== 16) {
        errors.cardNumber = 'Valid card number is required';
      }
      if (!state.name) {
        errors.cardName = 'Cardholder name is required';
      }
      if (!state.expiry || state.expiry.length !== 4) {
        errors.expiry = 'Valid expiry date is required';
      }
      if (!state.cvc || state.cvc.length !== 3) {
        errors.cvc = 'Valid CVC is required';
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setOrderComplete(true);
      if (onOrderComplete) {
        onOrderComplete();
      }
      // setTimeout(() => {
      //   navigate('/');
      // }, 1000000);

       // Navigate to success page with order details
       navigate('/success', { 
        state: { 
          order,
          deliveryAddress,
          deliveryDateTime,
          paymentMethod
        } 
      });
    }
  };

  return (
    <div className="payment-container">
      <h1>Delivery and Payment Details</h1>
      
      <div className="delivery-details">
        <h4>Delivery Information</h4>
        <div className="form-group">
          <label>Delivery Address</label>
          <input 
            type="text" 
            placeholder="Enter delivery address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className={formErrors.address ? 'error' : ''}
          />
          {formErrors.address && <span className="error-message">{formErrors.address}</span>}
        </div>
        
        <div className="form-group">
          <label>Delivery Date & Time</label>
          <input 
            type="datetime-local"
            value={deliveryDateTime}
            onChange={(e) => setDeliveryDateTime(e.target.value)}
            className={formErrors.datetime ? 'error' : ''}
          />
          {formErrors.datetime && <span className="error-message">{formErrors.datetime}</span>}
        </div>
      </div>

      <div className="amount-display">
        <h3>Amount to Pay: {order.totalPrice.toFixed(2)}€</h3>
      </div>

      <form onSubmit={handlePaymentSubmit}>
        <div className="payment-methods">
          <h2>Select Payment Method</h2>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Credit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="debit"
                checked={paymentMethod === 'debit'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Debit Card
            </label>
            <label>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>
            {formErrors.paymentMethod && <span className="error-message">{formErrors.paymentMethod}</span>}
          </div>
        </div>

        {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
          <div className="card-details">
            <Cards
              number={state.number}
              expiry={state.expiry}
              cvc={state.cvc}
              name={state.name}
              focused={state.focus}
            />
            
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="number"
                placeholder="Card Number"
                value={state.number}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                maxLength="16"
                className={formErrors.cardNumber ? 'error' : ''}
              />
              {formErrors.cardNumber && <span className="error-message">{formErrors.cardNumber}</span>}
            </div>
    
            <div className="form-group">
              <label>Cardholder Name</label>
              <input
                type="text"
                name="name"
                placeholder="Name on Card"
                value={state.name}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                className={formErrors.cardName ? 'error' : ''}
              />
              {formErrors.cardName && <span className="error-message">{formErrors.cardName}</span>}
            </div>
    
            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={state.expiry}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength="4"
                  className={formErrors.expiry ? 'error' : ''}
                />
                {formErrors.expiry && <span className="error-message">{formErrors.expiry}</span>}
              </div>
              
              <div className="form-group">
                <label>CVC</label>
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  value={state.cvc}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  maxLength="3"
                  className={formErrors.cvc ? 'error' : ''}
                />
                {formErrors.cvc && <span className="error-message">{formErrors.cvc}</span>}
              </div>
            </div>
          </div>
        )}
        
        <button type="submit" className="submit-button">
          Confirm Payment
        </button>
      </form>
    </div>
  );
}

export default Payment;