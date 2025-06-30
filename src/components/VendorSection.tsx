
import React from 'react';
import { Store, TrendingUp, Users, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VendorSection = () => {
  const benefits = [
    {
      icon: Store,
      title: 'Encuentra más compradores',
      description: 'En nuestra plataforma se reúnen todas las personas que necesitan soluciones energéticas.'
    },
    {
      icon: TrendingUp,
      title: 'Vender nunca había sido tan fácil',
      description: 'Contamos con numerosas herramientas que harán de tu proceso de venta algo más fácil.'
    },
    {
      icon: Users,
      title: 'Recibe ayuda siempre',
      description: 'Te ofrecemos ayuda y te ofrecemos guías para gestionar mejor tus ventas.'
    },
    {
      icon: Megaphone,
      title: 'Date a conocer',
      description: 'Nuestro algoritmo de búsqueda te ayudará a darte a conocer a más clientes.'
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ¿Quieres publicar en Lumina?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conviértete en uno de nuestros prósperos vendedores. Obtén beneficios exclusivos en tu primer publicación.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Benefits */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                ¿Por qué vender en Lumina?
              </h3>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side - CTA */}
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full mx-auto flex items-center justify-center">
                <Store className="w-10 h-10 text-white" />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No esperes más, ¡prospera con nosotros!
                </h3>
                <p className="text-gray-600 mb-6">
                  Únete a nuestro marketplace y comienza a llegar a clientes que necesitan soluciones de energía confiables. Nuestro proceso de incorporación simplificado te permite empezar a vender en días, no en semanas.
                </p>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                  Aplica para ser vendedor
                </Button>
                <Button variant="outline" className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white py-3">
                  Descarga la guía de vendedor
                </Button>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  ¿Ya eres vendedor? <a href="#" className="text-blue-600 font-medium">Ingresa a tu panel de control</a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-xl p-8 shadow-lg">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Vendedores activos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600">Productos publicados</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">$2M+</div>
              <div className="text-gray-600">Ventas mensuales</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Satisfacción de ventas</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorSection;
