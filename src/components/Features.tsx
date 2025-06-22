
import React from 'react';
import { Truck, Shield, Clock, CreditCard } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Truck,
      title: 'Entrega inmediata',
      description: '¡No hay tiempo para esperar! Reactiva tu productividad hoy mismo.',
      color: 'blue'
    },
    {
      icon: Shield,
      title: 'Vendedores verificados',
      description: 'Compra tranquilo, sabiendo que todos nuestros vendedores son cuidadosamente seleccionados.',
      color: 'green'
    },
    {
      icon: Clock,
      title: 'Atención 24/7',
      description: '¿Necesitas ayuda? Estamos disponibles todo el tiempo para tí.',
      color: 'purple'
    },
    {
      icon: CreditCard,
      title: 'Pago seguro',
      description: 'Contamos con los métodos de pagos más seguros en el mercado digítal. ¡Compra tranquilo, ñaño!',
      color: 'orange'
    }
  ];

  const getColorClasses = (color) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      orange: 'bg-orange-100 text-orange-600'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-600';
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            ¿Por qué Lumina es mejor?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Porque entendemos lo malo que trae la falta de electricidad. Por ello te ofrecemos las mejores soluciones.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center"
            >
              <div className={`w-16 h-16 ${getColorClasses(feature.color)} rounded-full flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
