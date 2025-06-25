import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const SearchFiltersCategory = () => {
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');

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
    <section className="py-4 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Barra de búsqueda */}
            <div className="md:col-span-2">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Busca por nombre, modelo o especificaciones..."
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
                />
                <Button className="absolute right-0 top-0 h-full px-4 bg-blue-600 hover:bg-blue-700 rounded-l-none">
                  <Search className="w-5 h-5 text-white" />
                </Button>
              </div>
            </div>

            {/* Filtro por precio */}
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

            {/* Filtro por marca */}
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

          {/* Filtros adicionales */}
          <div className="flex flex-wrap items-center gap-4 mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filtros ágiles:</span>
            </div>
            <Button variant="outline" size="sm">Disponible</Button>
            <Button variant="outline" size="sm">Envío rápido</Button>
            <Button variant="outline" size="sm">Más comprado</Button>
            <Button variant="outline" size="sm">En oferta</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchFiltersCategory;
