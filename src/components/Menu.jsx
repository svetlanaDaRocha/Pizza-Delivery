import React, { useState } from 'react';
import PizzaCard from './PizzaCard';
import Modal from './Modal';
import Customization from './Customization';
import { pizzaData } from '../data/pizzaData';
import './Menu.css';

function Menu({ onAddToOrder }) {
  const [selectedPizza, setSelectedPizza] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePizzaSelect = (pizza) => {
    setSelectedPizza(pizza);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPizza(null);
  };

  return (
    <div className="menu">
      <h1>Our Pizza Menu</h1>
      <div className="pizza-grid">
        {pizzaData.map((pizza) => (
          <PizzaCard 
            key={pizza.id} 
            pizza={pizza} 
            onSelect={() => handlePizzaSelect(pizza)}
          />
        ))}
      </div>

      {selectedPizza && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Customization
            pizza={selectedPizza}
            onClose={handleCloseModal}
            onAddToOrder={onAddToOrder}
          />
        </Modal>
      )}
    </div>
  );
}

export default Menu; 