
import React from 'react';
import Header from '../components/Header';
import ProductCategories from '../components/ProductCategories';
import Footer from '../components/Footer';


const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <ProductCategories />
      <Footer />
    </div>
  );
};

export default Index;