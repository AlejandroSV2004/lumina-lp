import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Boxes } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
const API = import.meta.env.VITE_API_URL;

interface Categoria {
  codigo_categoria: string;
  nombre: string;
  descripcion: string;
  icono?: string;
  color?: string;
  slug: string;
  cantidad?: string;
}

const getColorClasses = (color: string = 'gray') => {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    yellow: 'from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700',
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
    teal: 'from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700',
    gray: 'from-gray-500 to-gray-600'
  };
  return colorMap[color] || colorMap.gray;
};

const ProductCategories = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch(`${API}/categorias`);
        if (!res.ok) throw new Error("Error en la respuesta del servidor");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error('Error cargando categorías:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, []);

  return (
    <section className="pt-4 pb-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Compra por categorías</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Encuentra sin esfuerzo justo eso que necesitas. ¡No te compliques y empieza a disfrutar de soluciones óptimas!
          </p>
        </div>

        {/* Estado de carga / error / categorías */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando categorías...</p>
        ) : error || categorias.length === 0 ? (
          <p className="text-center text-red-500">No se pudieron cargar categorías o no hay ninguna.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categorias.map((cat, index) => {
              const IconComponent: LucideIcon = (Icons[cat.icono as keyof typeof Icons] || Boxes) as LucideIcon;

              return (
                <Link
                  key={index}
                  to={`/categorias/${cat.slug}`}
                  className={`bg-gradient-to-br ${getColorClasses(cat.color)} rounded-xl p-6 text-white cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl group`}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center group-hover:bg-opacity-30 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{cat.nombre}</h3>
                      <p className="text-sm opacity-90 mb-2">{cat.descripcion}</p>
                      <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                        {cat.cantidad || 'Ver más'}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Banner Kits */}
        <div className="mt-12 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-2">Kits de electricidad</h3>
          <p className="text-lg opacity-90 mb-4">
            Kits pre-armados para cualquier tipo de apuro. ¡Te tenemos cubierto!
          </p>
          <button
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Revisar kits
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
