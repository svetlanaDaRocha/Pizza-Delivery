import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SuccessOrder.css';
import { useRef } from "react";
import jsPDF from "jspdf";

function SuccessOrder({ order }) {
  const location = useLocation();
  const navigate = useNavigate();
  const orderDetails = location.state;
  const orderRef = useRef();

  const generatePDF = () => {
    const doc = new jsPDF({
        orientation: "landscape", // Set the PDF to landscape mode
        unit: "px", // Unit for dimensions (pixels)
        format: "a4", // A4 paper size
    });

      doc.html(orderRef.current, {
          callback: function (doc) {
              doc.save("order-summary.pdf");
          },
          x: 10,
          y: 10,
      });
    };

  useEffect(() => {
    // Redirect to home after 90 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 90000);

    return () => clearTimeout(timer);
  }, [navigate]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  // If no order details, redirect to home
  if (!orderDetails) {
    navigate('/');
    return null;
  }

  return (
    <div className="success-order">
      <div className="success-message">
        <h1>When life gives you dough, make a Pizza Party!</h1>
        <h2>Thank you for your order!</h2>
      </div>
     <div ref={orderRef} style={{ border: "1px solid #ccc" }} >
      <div className="order-details">
        <h3>Order Summary</h3>
        
        <div className="delivery-info">
          <h4>Delivery Details</h4>
          <p><strong>Address:</strong> {orderDetails.deliveryAddress}</p>
          <p><strong>Delivery Time:</strong> {formatDate(orderDetails.deliveryDateTime)}</p>
          <p><strong>Payment Method:</strong> {orderDetails.paymentMethod.charAt(0).toUpperCase() + orderDetails.paymentMethod.slice(1)}</p>
        </div>

        <div className="items-list">
          <h4>Ordered Items</h4>
          {orderDetails.order.items.map((item, index) => (
            <div key={index} className="order-item">
              <h5>{item.pizza.name} × {item.quantity}</h5>
              <p className="toppings">
                {item.toppings.length > 0 
                  ? `Extra Toppings: ${item.toppings.map(t => t.name).join(', ')}` 
                  : 'No extra toppings'}
              </p>
              <p className="item-price">{item.price.toFixed(2)}€</p>
            </div>
          ))}
        </div>

        <div className="total-price">
          <h4>Total Amount Paid: {orderDetails.order.totalPrice.toFixed(2)}€</h4>
        </div>
      </div>
      </div>
      <button className='download-pdf-button' onClick={generatePDF} style={{ marginTop: "20px" }}>Download PDF</button>
    
      <p className="redirect-message">Redirecting to home page in 90 seconds...</p>
     
    </div>
  );
}

export default SuccessOrder; 