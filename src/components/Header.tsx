import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  User,
  Globe,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link, useNavigate } from 'react-router-dom';
import luminaLogo from '../img/lumina.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<{
    id_usuario: string;
    nombre_usuario: string;
    foto_perfil?: string;
    es_negocio?: number;
  } | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('usuario');
    if (userData) {
      setUsuario(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    setUsuario(null);
    navigate('/');
  };

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

            {/* Auth / Bienvenida */}
            {!usuario ? (
              <Link to="/auth">
                <Button variant="ghost" className="hidden md:flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Iniciar sesión / Regístrate</span>
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate(`/perfil/${usuario?.id_usuario}`)}>
                {usuario.foto_perfil ? (
                  <img
                    src={usuario.foto_perfil}
                    alt="Foto de perfil"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 border border-gray-300">
                    <User className="w-4 h-4" />
                  </div>
                )}
                <span className="text-sm text-gray-700 hidden md:inline">
                  Bienvenido, <strong>{usuario.nombre_usuario}</strong>
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation(); // evita que dispare la navegación al perfil
                    handleLogout();
                  }}
                  title="Cerrar sesión"
                >
                  <LogOut className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            )}

            {/* Shopping Cart */}
            <Link to="/carrito">
              <Button variant="ghost" className="relative">
                <ShoppingCart className="w-5 h-5" />
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
  <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
    Página principal
  </Link>
  <Link to="/categorias" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
    Categorías
  </Link>
  <Link to="/ofertas" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
    Ofertas
  </Link>
  <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
    Soporte
  </a>
  <Link to="/feria" className="text-red-600 font-medium transition-colors">
    ¡Gracias por venir!
  </Link>

  {usuario?.es_negocio === 1 && (
  <Link to="/panel-vendedor" className="text-blue-600 font-semibold transition-colors">
    Panel de vendedor
  </Link>
)}

</nav>


        {/* Mobile Menu */}
        {isMenuOpen && (
  <div className="md:hidden py-4 border-t">
    <div className="flex flex-col space-y-4">
      <Input type="text" placeholder="Buscar productos..." className="w-full" />
      <Link to="/" className="text-gray-700 font-medium">Página principal</Link>
      <Link to="/categorias" className="text-gray-700 font-medium">Categorías</Link>
      <Link to="/ofertas" className="text-gray-700 font-medium">Ofertas</Link>
      <a href="#" className="text-gray-700 font-medium">Soporte</a>
      <Link to="/feria" className="text-red-600 font-medium">¡Gracias por venir!</Link>

      {usuario?.es_negocio === 1 && (
  <Link to="/panel-vendedor" className="text-blue-600 font-medium">Panel de vendedor</Link>
)}


              {!usuario ? (
                <Link to="/auth">
                  <Button className="w-full" variant="outline">
                    Iniciar sesión / Regístrate
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to={`/perfil/${usuario.id_usuario}`}>
  <Button className="w-full" variant="outline">
    Ir a perfil
  </Button>
</Link>

                  <Button onClick={handleLogout} className="w-full border-red-500 text-red-500" variant="outline">
                    Cerrar sesión
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
