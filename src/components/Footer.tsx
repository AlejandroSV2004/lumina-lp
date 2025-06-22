
import React from 'react';
import { Mail, Facebook, Twitter, Instagram, Youtube, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import luminaLogo from '../img/lumina.png';

const Footer = () => {
  const footerLinks = {
    company: [
      { label: 'Sobre nosotros', href: '#' },
      { label: 'Contacto', href: '#' },
      { label: 'Ayuda', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Más información', href: '#' }
    ],
    support: [
      { label: 'Centro de Ayuda', href: '#' },
      { label: 'Soporte', href: '#' },
      { label: 'Información de envío', href: '#' },
      { label: 'FAQ', href: '#' },
      { label: 'Garantía', href: '#' }
    ],
    legal: [
      { label: 'Términos y condiciones', href: '#' },
      { label: 'Política de privacidad', href: '#' },
      { label: 'Política de cookies', href: '#' },
      { label: 'Acuerdo de vendedor', href: '#' },
      { label: 'Resolución de disputas', href: '#' }
    ],
    categories: [
      { label: 'Generadores', href: '#' },
      { label: 'Paneles solares', href: '#' },
      { label: 'Baterías', href: '#' },
      { label: 'Powerbanks', href: '#' },
      { label: 'Kits de electricidad', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600 to-green-600 rounded-xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                ¡Mantente informado!
              </h3>
              <p className="text-blue-100">
                Obtén alertas, promociones, recomendaciones y cupones directamente en tu correo
              </p>
            </div>
            <div className="flex space-x-3">
              <Input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                className="flex-1 bg-white text-gray-900"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6">
                <Mail className="w-4 h-4 mr-2" />
                Suscribirse
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                <img src={luminaLogo} alt="Lumina Logo"/>
              </div>
              <span className="text-2xl font-bold">Lumina</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Tu marketplace de confianza para soluciones energéticas en emergencias. Conectamos proveedores confiables con clientes que necesitan energía cuando más importa.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">Línea 24/7: 1-800-LUMINA-APP</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">Envíos a todo Ecuador</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Compañía</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Soporte</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">Categorías</h4>
            <ul className="space-y-2">
              {footerLinks.categories.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-gray-300 hover:text-white transition-colors text-sm">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media & Bottom */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 text-sm">Síguenos:</span>
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Copyright & Legal */}
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <span>© 2025 Lumina. Todos los derechos reservados.</span>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition-colors">Términos</a>
                <a href="#" className="hover:text-white transition-colors">Privacidad</a>
                <a href="#" className="hover:text-white transition-colors">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
