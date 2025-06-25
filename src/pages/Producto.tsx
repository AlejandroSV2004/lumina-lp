import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const allProducts = [
  {
    id: "1",
    name: "Powerbank 10.000 mAh",
    price: 29.99,
    image: "https://placehold.co/300x400",
    description: "Una batería portátil potente y compacta para cargar tus dispositivos en cualquier lugar.",
    category: "powerbanks"
  },
  {
    id: "2",
    name: "Powerbank solar resistente",
    price: 45.5,
    image: "https://placehold.co/300x400",
    description: "Diseñada para la aventura, con carga solar y resistente al agua.",
    category: "powerbanks"
  },
  {
    id: "3",
    name: "Panel solar 50W",
    price: 89.99,
    image: "https://placehold.co/300x400",
    description: "Ideal para cargar laptops, móviles y otros gadgets en exteriores.",
    category: "paneles-solares"
  },
  {
    id: "4",
    name: "Panel solar 100W",
    price: 139.99,
    image: "https://placehold.co/300x400",
    description: "Alta eficiencia y tamaño portátil para energía en movimiento.",
    category: "paneles-solares"
  }
];

const Producto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = allProducts.find(p => p.id === id);

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />
      {!product ? (
        <main className="p-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Producto no encontrado</h1>
        </main>
      ) : (
        <main className="p-8 max-w-6xl mx-auto">
          {/* Botón de regreso */}
          <button
            onClick={() => navigate(`/categorias/${product.category}`)}
            className="mb-6 inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            ← Regresar a categoría
          </button>

          {/* Contenido en dos columnas */}
          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Imagen a la izquierda */}
            <img
              src={product.image}
              alt={product.name}
              className="w-[300px] h-[400px] object-cover rounded-lg"
            />

            {/* Info del producto a la derecha */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              <p className="text-gray-700 mb-6">{product.description}</p>

              <p className="text-2xl font-bold text-blue-600 mb-4">${product.price.toFixed(2)}</p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                  Comprar ahora
                </button>
                <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition">
                  Agregar al carrito
                </button>
              </div>

              <a href="#" className="text-sm text-red-500 hover:underline">
                Reportar un problema
              </a>
            </div>
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default Producto;
