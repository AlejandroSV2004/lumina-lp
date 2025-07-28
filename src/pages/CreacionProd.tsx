import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CreacionProducto from '../components/CreacionProducto';

const CreacionProd = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />
      <main className="p-8">
        <CreacionProducto />
      </main>
      <Footer />
    </div>
  );
};

export default CreacionProd;