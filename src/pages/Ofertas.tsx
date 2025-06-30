import React from 'react';
import Header from '../components/Header';
import ProductCategories from '../components/ProductCategories';
import Footer from '../components/Footer';
import { useParams, useNavigate, Link } from "react-router-dom";
import DealsOffers from '../components/DealsOffers';


const Ofertas = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            ← Regresar a la página principal
          </button>
        </div>
      <DealsOffers/>
      <Footer />
    </div>
  );
};

export default Ofertas;