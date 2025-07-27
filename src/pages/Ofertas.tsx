import React from 'react';
import Header from '../components/Header';
import ProductCategories from '../components/ProductCategories';
import Footer from '../components/Footer';

import DealsOffers from '../components/DealsOffers';


const Ofertas = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DealsOffers/>
      <Footer />
    </div>
  );
};

export default Ofertas;