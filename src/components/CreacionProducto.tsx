import { useState, useEffect } from 'react';

type Categoria = { id: string; nombre: string; slug: string };

const API_BASE =
  (import.meta as any)?.env?.VITE_API_URL?.toString()?.replace(/\/+$/, '') ||
  '';


const api = (path: string) =>
  `${API_BASE}${path.startsWith('/') ? '' : '/'}${path}`;

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
  const id_vendedor = usuario?.id_usuario;

  useEffect(() => {
    if (!usuario?.es_negocio) {
      setMensaje('Solo cuentas de negocio pueden crear productos');
    }

    (async () => {
      try {
        const res = await fetch(api('/api/categorias/'));
        let raw: any = [];
        try { raw = await res.json(); } catch { raw = []; }

        const arr = Array.isArray(raw) ? raw : Array.isArray(raw?.data) ? raw.data : [];
        const list: Categoria[] = arr.map((c: any) => ({
          id: String(c.id ?? c.codigo_categoria ?? ''),
          nombre: String(c.nombre ?? ''),
          slug: String(c.slug ?? ''),
        }));
        setCategorias(list);
      } catch {
        setMensaje('Error al cargar categorías');
        setCategorias([]);
      }
    })();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id_vendedor) {
      setMensaje('Debes iniciar sesión');
      return;
    }
    if (!slugCategoria) {
      setMensaje('Selecciona una categoría');
      return;
    }

    const producto = {
      id_vendedor,
      nombre: nombre.trim(),
      precio: Number(precio),
      descripcion: descripcion.trim(),
      stock: Number(stock),
      imagen: imagen.trim(),
    };

    try {
      const res = await fetch(api(`/api/productos/${encodeURIComponent(slugCategoria)}`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(producto),
      });

      if (res.ok) {
        setMensaje('Producto creado exitosamente');
        setNombre('');
        setPrecio('');
        setDescripcion('');
        setStock('');
        setImagen('');
        setSlugCategoria('');
      } else {
        let err = 'Error al crear producto';
        try {
          const j = await res.json();
          if (j?.error) err = j.error;
        } catch {}
        setMensaje(`${err}`);
      }
    } catch {
      setMensaje('Error al conectar con el servidor');
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
          step="0.01"
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
          min={0}
          required
        />

        <input
          type="url"
          placeholder="URL de imagen"
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
            <option key={cat.id} value={cat.slug}>
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
