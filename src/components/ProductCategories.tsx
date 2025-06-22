
import React from 'react';
import { Battery, Zap, Sun, Settings, Home, Grid3X3, Smartphone } from 'lucide-react';

const ProductCategories = () => {
  const categories = [
    {
      icon: Smartphone,
      title: 'Power Banks',
      description: 'Portable charging solutions',
      count: '1,200+ products',
      color: 'blue'
    },
    {
      icon: Sun,
      title: 'Portable Solar Panels',
      description: 'Clean energy on-the-go',
      count: '800+ products',
      color: 'yellow'
    },
    {
      icon: Battery,
      title: 'Lithium Batteries',
      description: 'High-capacity storage',
      count: '2,100+ products',
      color: 'green'
    },
    {
      icon: Zap,
      title: 'Diesel Generators',
      description: 'Heavy-duty backup power',
      count: '600+ products',
      color: 'red'
    },
    {
      icon: Settings,
      title: 'Inverters & UPS',
      description: 'Power conversion systems',
      count: '900+ products',
      color: 'purple'
    },
    {
      icon: Home,
      title: 'Home Energy Storage',
      description: 'Residential power systems',
      count: '400+ products',
      color: 'indigo'
    },
    {
      icon: Grid3X3,
      title: 'Smart Grid Devices',
      description: 'Intelligent energy management',
      count: '300+ products',
      color: 'teal'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
      yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
      green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
      red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
      purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
      indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
      teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700'
    };
    return colorMap[color] || 'from-gray-500 to-gray-600';
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find the perfect energy solution for your needs, from portable power to complete home systems
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${getColorClasses(category.color)} rounded-xl p-6 text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                  <category.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm opacity-90 mb-2">
                    {category.description}
                  </p>
                  <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                    {category.count}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Kit Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Emergency Power Kits</h3>
          <p className="text-lg opacity-90 mb-4">Pre-configured solutions for instant blackout protection</p>
          <button className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            View Emergency Kits
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
