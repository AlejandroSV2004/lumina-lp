import { useState, useEffect } from 'react';

interface Categoria {
  codigo_categoria: string;
  nombre: string;
  slug: string;
}

const CreacionProducto = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');
  const [slugCategoria, setSlugCategoria] = useState('');
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [mensaje, setMensaje] = useState('');

  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
  const id_vendedor = usuario.id_usuario;

  useEffect(() => {
    if (!usuario.es_negocio) {
      setMensaje('❌ Solo cuentas de negocio pueden crear productos');
    }

    fetch('https://lumina-backend-qhzo.onrender.com/api/categorias')
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(() => setMensaje('Error al cargar categorías.'));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const producto = {
      id_vendedor,
      nombre,
      precio,
      descripcion,
      stock,
      imagen
    };

    try {
      const res = await fetch(`https://lumina-backend-qhzo.onrender.com/api/productos/${slugCategoria}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(producto)
      });

      if (res.ok) {
        setMensaje('✅ Producto creado exitosamente');
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setStock('');
        setImagen('');
        setSlugCategoria('');
      } else {
        const { error } = await res.json();
        setMensaje(`❌ ${error || 'Error al crear producto'}`);
      }
    } catch (error) {
      setMensaje('❌ Error al conectar con el servidor');
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Crear Producto</h2>

      {mensaje && <p className="mb-4 text-center">{mensaje}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full p-2 border rounded"
          rows={4}
          required
        />

        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          placeholder="URL de imagen (Cloudinary o similar)"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          value={slugCategoria}
          onChange={(e) => setSlugCategoria(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((cat) => (
            <option key={cat.codigo_categoria} value={cat.slug}>
              {cat.nombre}
            </option>
          ))}
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Crear Producto
        </button>
      </form>
    </div>
  );
};

export default CreacionProducto;
