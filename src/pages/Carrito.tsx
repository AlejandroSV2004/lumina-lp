import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cart from '../components/Cart';

const Carrito = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />
      <main className="p-8">
        <Cart />
      </main>
      <Footer />
    </div>
  );
};

export default Carrito;
