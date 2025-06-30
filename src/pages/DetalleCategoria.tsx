import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SearchFiltersCategory from "@/components/SearchFiltersCategory";

// 🔍 Datos simulados por categoría con imagen
const categoryContent = {
  powerbanks: {
    title: "Powerbanks",
    description: "¡Lleva tu energía donde vayas!",
    products: [
      {
        id: "1",
        name: "Powerbank 10.000 mAh",
        price: 29.99,
        image: "https://placehold.co/200x300"
      },
      {
        id: "2",
        name: "Powerbank solar resistente",
        price: 45.5,
        image: "https://placehold.co/200x300"
      }
    ]
  },
  "paneles-solares": {
    title: "Paneles solares portátiles",
    description: "Energía hasta donde llegue el sol.",
    products: [
      {
        id: "3",
        name: "Panel solar 50W",
        price: 89.99,
        image: "https://placehold.co/200x300"
      },
      {
        id: "4",
        name: "Panel solar 100W",
        price: 139.99,
        image: "https://placehold.co/200x300"
      }
    ]
  }
};

const DetalleCategoria = () => {
  const { nombreCategoria } = useParams();
  const navigate = useNavigate();
  const categoria = categoryContent[nombreCategoria as keyof typeof categoryContent];

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />
      {!categoria ? (
        <main className="p-8 text-center">
          <button
            onClick={() => navigate("/categorias")}
            className="mb-6 inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            ← Regresar a todas las categorías
          </button>
          <h1 className="text-3xl font-bold text-red-600 mb-4">Categoría no encontrada</h1>
          <p>
            La categoría <strong>{nombreCategoria}</strong> no existe o fue removida.
          </p>
        </main>
      ) : (
        <main className="p-8 max-w-6xl mx-auto">
          {/* 🔙 Botón de regreso */}
          <button
            onClick={() => navigate("/categorias")}
            className="mb-6 inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            ← Regresar a todas las categorías
          </button>

          {/* Título y descripción centrados */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-2">{categoria.title}</h1>
            <p className="text-gray-600 text-lg">{categoria.description}</p>
          </div>
           {/* Este es mi nuevo componente que genera el conflicto*/}
          <SearchFiltersCategory/> 

          {/* Productos */}
<div className="w-full flex justify-center">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-[900px]">
    {categoria.products.map(product => (
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
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover rounded-lg"
          />
        </div>
        <p className="text-blue-600 font-bold text-lg mt-3">
          ${product.price.toFixed(2)}
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
