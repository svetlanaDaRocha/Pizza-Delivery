import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, NavLink } from 'react-router-dom';
import Menu from './components/Menu';
import OrderSummary from './components/OrderSummary';
import Payment from './components/Payment';
import Basket from './components/Basket';
import SuccessOrder from './components/SuccessOrder';
import './App.css';
import 'animate.css';

function MainContent({ order, onAddToOrder, onOrderComplete }) {
  const location = useLocation();
  const isPaymentPage = location.pathname === '/payment';

  return (
    <main className="main-content">
      <div className="menu-container">
        <Routes>
          <Route 
            path="/" 
            element={<Menu onAddToOrder={onAddToOrder} />} 
          />
          <Route 
            path="/payment" 
            element={<Payment 
              order={order} 
              onOrderComplete={onOrderComplete}
            />} 
          />
          <Route path="/success" element={<SuccessOrder />} />
        </Routes>
      </div>

      {/* Only show OrderSummary if we're not on the payment page and have items */}
      {!isPaymentPage && order.items.length > 0 && (
        <OrderSummary 
          order={order} 
          className="order-sidebar"
        />
      )}
    </main>
  );
}

function App() {
  const [order, setOrder] = useState({
    items: [],
    totalPrice: 0,
    deliveryTime: '',
  });
  const [isBasketOpen, setIsBasketOpen] = useState(false);

  const onAddToOrder = (item) => {
    setOrder(prev => ({
      ...prev,
      items: [...prev.items, item],
      totalPrice: prev.totalPrice + item.price
    }));
  };

  const onOrderComplete = () => {
    setOrder({
      items: [],
      totalPrice: 0,
      deliveryTime: '',
    });
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <NavLink to="/">
          <img src={'./images/pizza-party-icon2.png'} alt="Pizza Party Logo" className="logo" />
          </NavLink>
          <div className="header-text">
            <h1 className="animate__animated animate__bounceIn">Pizza Party Delivery</h1>
            <h2>Bringing the party to your door, one slice at a time!</h2>
          </div>
          <button 
            className="basket-icon"
            onClick={() => setIsBasketOpen(true)}
          >
            🛒 Cart ({order.items.length})
          </button>
        </header>

        <MainContent 
          order={order} 
          onAddToOrder={onAddToOrder} 
          onOrderComplete={onOrderComplete}
        />

        <Basket 
          order={order}
          isOpen={isBasketOpen}
          onClose={() => setIsBasketOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
