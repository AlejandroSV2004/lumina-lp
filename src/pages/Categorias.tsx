import React from 'react';
import Header from '../components/Header';
import ProductCategories from '../components/ProductCategories';
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />

      <main className="p-6 max-w-6xl mx-auto w-full">
        {/*Botón de regreso */}
        <div className="mb-6">
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-blue-600 font-medium hover:underline"
          >
            ← Regresar a la página principal
          </button>
        </div>

        {/*Categorías */}
        <ProductCategories />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
