import React, { useState } from 'react';
import { Search, ShoppingCart, Menu, User, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import luminaLogo from '../img/lumina.png';
import { useCart } from '../../context/CartContext'; // ✅ Importar hook del contexto

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart(); // ✅ Obtener el contador desde el contexto

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
              <img src={luminaLogo} alt="Lumina Logo" />
            </div>
            <span className="text-2xl font-bold text-gray-800">Lumina</span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Busca generadores, baterías, power banks,..."
                className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500"
              />
              <Button className="absolute right-0 top-0 h-full px-6 bg-blue-600 hover:bg-blue-700 rounded-l-none">
                <Search className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Language Selector */}
            <Button variant="ghost" size="sm" className="hidden md:flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span>es/🇪🇨</span>
            </Button>

            {/* Sign In */}
            <Button variant="ghost" className="hidden md:flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Iniciar sesión / Regístrate</span>
            </Button>

            {/* Shopping Cart */}
            <Link to="/carrito">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation Menu - Desktop */}
        <nav className="hidden md:flex items-center space-x-8 py-3 border-t">
          <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Página principal</Link>
          <Link to="/categorias" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Categorías</Link>
          <Link to="/ofertas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Ofertas</Link>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Soporte</a>
          <a href="#" className="text-red-600 font-medium">Kits de electricidad</a>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full"
              />
              <Link to="/" className="text-gray-700 font-medium">Página principal</Link>
              <Link to="/categorias" className="text-gray-700 font-medium">Categorías</Link>
              <Link to="/ofertas" className="text-gray-700 font-medium">Ofertas</Link>
              <a href="#" className="text-gray-700 font-medium">Soporte</a>
              <Button className="w-full" variant="outline">Iniciar sesión / Regístrate</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
