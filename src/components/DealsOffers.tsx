import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import powerbank from '../img/powerbank.jpg';
import generator from '../img/generator.jpg';
import solar_panel from '../img/solar_panel.jpg';
import { useNavigate } from "react-router-dom";

const DealsOffers = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const deals = [
    {
      id: 1,
      title: 'Kit luminoso de emergencia',
      description: 'Powerbank + Panel Solar + Luces LED',
      originalPrice: 40.00,
      salePrice: 20.00,
      discount: 50,
      rating: 4.9,
      reviews: 156,
      timeLeft: 'Termina en 2 días',
      image: powerbank
    },
    {
      id: 2,
      title: 'Generador a diésel',
      description: 'Generador a diésel de 5000W con iniciado automático',
      originalPrice: 400.00,
      salePrice: 360.00,
      discount: 10,
      rating: 4.9,
      reviews: 89,
      timeLeft: 'Termina hoy',
      image: generator
    },
    {
      id: 3,
      title: 'Estación de energia solar',
      description: 'Batería de 1000Wh portatil + 2 paneles de 200W',
      originalPrice: 300.00,
      salePrice: 150.00,
      discount: 50,
      rating: 4.7,
      reviews: 203,
      timeLeft: 'Termina mañana',
      image: solar_panel
    }
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % deals.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + deals.length) % deals.length);

  return (
    <section className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen px-6 md:px-10">
      <div className="ml-10 pt-10">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 font-medium hover:underline"
        >
          ← Regresar a la página principal
        </button>
      </div>

      {/* Título */}
      <div className="mt-2 text-center">
        <h1 className="text-4xl font-bold">Ofertas de tiempo limitado</h1>
        <p className="text-lg text-gray-600 mt-2">
          ¡No te las pierdas! Aprovecha estos jugosos descuentos antes de que se vayan
        </p>
      </div>

      {/* Carousel */}
      <div className="relative mt-10">
        <div className="overflow-hidden rounded-xl">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {deals.map((deal) => (
              <div key={deal.id} className="w-full flex-shrink-0">
                <div className="bg-white rounded-xl shadow-lg mx-2">
                  <div className="grid md:grid-cols-2 gap-8 p-8">
                    {/* Imagen */}
                    <div className="rounded-lg h-64 flex items-center justify-center relative">
                      <img src={deal.image} alt={deal.title} className="w-full h-full object-cover rounded-lg" />
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {deal.discount}% OFF
                      </div>
                    </div>

                    {/* Información */}
                    <div className="flex flex-col justify-center space-y-4">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{deal.title}</h3>
                        <p className="text-gray-600 mb-4">{deal.description}</p>
                      </div>

                      {/* Reseñas */}
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(deal.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">
                          {deal.rating} ({deal.reviews} reviews)
                        </span>
                      </div>

                      {/* Precios */}
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <span className="text-3xl font-bold text-green-600">${deal.salePrice}</span>
                          <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-red-600">
                          <Clock className="w-4 h-4" />
                          <span>{deal.timeLeft}</span>
                        </div>
                      </div>

                      <Button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold">
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Botones de navegación */}
        <Button
          variant="outline"
          size="sm"
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white shadow-lg"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-6">
          {deals.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOffers;
