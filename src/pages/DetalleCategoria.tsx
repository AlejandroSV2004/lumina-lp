import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchFiltersCategory from "@/components/SearchFiltersCategory";
const API = import.meta.env.VITE_API_URL;

interface Producto {
  id: number;
  name: string;
  price: number;
  image: string | null;
  descripcion?: string;
}

const DetalleCategoria = () => {
  const { nombreCategoria } = useParams();
  const navigate = useNavigate();
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!nombreCategoria) return;

    const fetchProductos = async () => {
      try {
        const res = await fetch(`${API}/productos/${nombreCategoria}`);
        if (!res.ok) throw new Error("No se pudo obtener productos");

        const data = await res.json();
        console.log("Productos cargados:", data);
        setProductos(data);
        setError(null);
      } catch (err) {
        console.error("Error cargando productos:", err);
        setError("Error al obtener productos o categoría inexistente.");
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [nombreCategoria]);

  const categoriaNombre = nombreCategoria
    ?.replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />

      {loading ? (
        <main className="p-8 text-center text-gray-500">Cargando productos...</main>
      ) : error ? (
        <main className="p-8 text-center">
          <button
            onClick={() => navigate("/categorias")}
            className="mb-6 inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            ← Regresar a todas las categorías
          </button>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Categoría no encontrada</h1>
          <p>
            La categoría <strong>{nombreCategoria}</strong> no existe o no tiene productos disponibles.
          </p>
        </main>
      ) : (
        <main className="p-8 max-w-6xl mx-auto">
          <button
            onClick={() => navigate("/categorias")}
            className="mb-6 inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            ← Regresar a todas las categorías
          </button>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">{categoriaNombre}</h1>
            <p className="text-gray-600 text-lg">
              Explora los productos disponibles en esta categoría
            </p>
          </div>

          <SearchFiltersCategory />

          <div className="w-full flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[900px]">
              {productos.map((product) => (
                <Link
                  key={product.id}
                  to={`/producto/${product.id}`}
                  className="block w-full max-w-[250px] h-[400px] border rounded-lg p-4 shadow transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between items-center text-center bg-white"
                >
                  <div className="w-full">
                    <h2 className="text-lg font-semibold mb-2 max-w-full line-clamp-2 break-words">
                      {product.name}
                    </h2>
                    <img
                      src={product.image ?? "https://placehold.co/300x400"}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <p className="text-blue-600 font-bold text-lg mt-3">
                    ${parseFloat(product.price as any).toFixed(2)}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </main>
      )}

      <Footer />
    </div>
  );
};

export default DetalleCategoria;
