
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import ProductCategories from '../components/ProductCategories';
import DealsOffers from '../components/DealsOffers';
import SearchFilters from '../components/SearchFilters';
import VendorSection from '../components/VendorSection';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Features />
      <SearchFilters />
      <VendorSection />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
