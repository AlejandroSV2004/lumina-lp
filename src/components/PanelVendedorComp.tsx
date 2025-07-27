import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Producto {
  id_producto: number;
  nombre: string;
  precio: number;
  url_imagen: string | null;
}

const PanelVendedorComp = () => {
  const [usuario, setUsuario] = useState<{ id_usuario: string; es_negocio: boolean } | null>(null);
  const [productos, setProductos] = useState<Producto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("usuario");
    if (userData) {
      const parsed = JSON.parse(userData);

      if (!parsed.es_negocio) {
        navigate('/');
      } else {
        setUsuario(parsed);

        // ✅ Usar la ruta RESTful correcta
        fetch(`http://localhost:3001/api/productosVendedor/${parsed.id_usuario}`)
          .then(res => res.json())
          .then(data => setProductos(data))
          .catch(err => console.error('Error al cargar productos del vendedor:', err));
      }
    } else {
      navigate('/auth');
    }
  }, []);

  const handleClickProducto = (id: number) => {
    navigate(`/producto/${id}`); // puedes cambiar a /editar-producto/${id} si lo deseas
  };

  if (!usuario) return null;

  return (
    <div className="pl-16 pr-16 pb-16 pt-16">
  <h1 className="text-2xl font-bold mb-2">Panel de Vendedor</h1>
  <p className="text-gray-600 mb-6">Da clic en un producto para editarlo o ver detalles.</p>

  {/* Carrusel horizontal con padding lateral */}
  <div className="px-2 md:px-4 lg:px-8 overflow-x-auto pb-4">
    <div className="flex space-x-4">
      {productos.length === 0 ? (
        <p className="text-gray-500">Aún no has publicado productos.</p>
      ) : (
        productos.map((producto) => (
          <div
            key={producto.id_producto}
            onClick={() => handleClickProducto(producto.id_producto)}
            className="min-w-[200px] cursor-pointer border rounded-lg p-3 shadow hover:shadow-md transition bg-white"
          >
            <h3 className="font-semibold text-center">{producto.nombre}</h3>
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center my-2 rounded overflow-hidden">
              <img
                src={producto.url_imagen || 'https://via.placeholder.com/300x400?text=Sin+Imagen'}
                alt={producto.nombre}
                className="h-full object-cover"
              />
            </div>
            <p className="text-center text-blue-600 font-bold">${producto.precio}</p>
          </div>
        ))
      )}
    </div>
  </div>

  {/* Enlace y botón */}
  <div className="flex items-center gap-4 mt-4">
  <button
    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
    onClick={() => navigate('/crear-producto')}
  >
    + Agregar producto
  </button>
  <a href="/mis-productos" className="text-blue-600 hover:underline text-sm">
    Ver todo
  </a>
</div>
      
</div>

  );
};

export default PanelVendedorComp;
