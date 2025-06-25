import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// Simulación de base de datos de productos
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
        <main className="p-8 max-w-4xl mx-auto text-center">
          <button
            onClick={() => navigate(`/categorias/${product.category}`)}
            className="mb-6 inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            ← Regresar a categoría
          </button>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <img
            src={product.image}
            alt={product.name}
            className="w-72 h-[400px] object-cover rounded-lg mx-auto mb-6"
          />
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default Producto;
