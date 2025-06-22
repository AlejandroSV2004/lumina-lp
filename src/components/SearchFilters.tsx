
import React, { useState } from 'react';
import { Search, Filter, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchFilters = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

  const popularTags = [
    'Kit para apagones',
    'Sistemas de emergencia',
    'Powerbank',
    'Panel solar',
    'Generador de respaldo',
    'Batería portátil',
    'UPS para el hogar',
    'Sistemas para acampar'
  ];


  const priceRanges = [
    'Menos de $100',
    '$100 - $500',
    '$500 - $1,000',
    '$1,000 - $2,500',
    'Más de $2,500'
  ];

  const brands = [
    'EcoFlow',
    'Goal Zero',
    'Jackery',
    'Bluetti',
    'Anker',
    'Honda',
    'Generac',
    'Renogy'
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Encuentra la solución que más se adapte a tus necesidades
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Usa nuestro sistema de filtros avanzado para encontrar justo lo que deseas
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-50 rounded-xl p-6 mb-8">
          <div className="grid lg:grid-cols-4 gap-6">
            {/* Search Bar */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Busca por nombre, modelo o especificaciones..."
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                />
                <Button className="absolute right-0 top-0 h-full px-4 bg-blue-600 hover:bg-blue-700 rounded-l-none">
                  <Search className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <select
                value={selectedPriceRange}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 bg-white"
              >
                <option value="">Cualquier precio</option>
                {priceRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Filter */}
            <div>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 bg-white"
              >
                <option value="">Cualquier Marca</option>
                {brands.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Additional Filters */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filtros ágiles:</span>
            </div>
            <Button variant="outline" size="sm">
              Disponible
            </Button>
            <Button variant="outline" size="sm">
              Envío rápido
            </Button>
            <Button variant="outline" size="sm">
              Más comprado
            </Button>
            <Button variant="outline" size="sm">
              En oferta
            </Button>
          </div>
        </div>

        {/* Popular Search Tags */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Tag className="w-5 h-5 text-gray-600" />
            <span className="text-lg font-medium text-gray-700">Lo más buscado:</span>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {popularTags.map((tag) => (
              <button
                key={tag}
                className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFilters;
