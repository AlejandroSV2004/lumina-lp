
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap, Shield } from 'lucide-react';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-green-50 py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Sin electricidad,{' '}
                <span className="text-blue-600"> con energía</span>.{'   '}
                <span className="text-green-600">Nunca</span> te frenes.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Descubre soluciones energéticas confiables para enfrentar los cortes de energía. Te conectamos con proveedores verificados para cubrir todas tus necesidades energéticas.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg transition-all hover:scale-105">
                Comprar
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 text-lg rounded-lg transition-all">
                ¿Eres vendedor?
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-4">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-600">Negocios verificados</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Entrega inmediata</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-bold text-green-600">50,000+</span> Products
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl p-8 lg:p-12">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Powerbanks</h3>
                  <p className="text-sm text-gray-600">Energía portatil a tu alcance</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow mt-8">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Generadores</h3>
                  <p className="text-sm text-gray-600">Produce tu propia electricidad</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow -mt-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Paneles Solares</h3>
                  <p className="text-sm text-gray-600">Aprovecha toda la energía del sol</p>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <div className="w-6 h-6 bg-purple-500 rounded"></div>
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Baterías</h3>
                  <p className="text-sm text-gray-600">Para todos tus dispositivos</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
