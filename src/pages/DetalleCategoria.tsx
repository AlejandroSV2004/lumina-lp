import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

// 🔍 Datos simulados por categoría con imagen
const categoryContent = {
  powerbanks: {
    title: "Powerbanks",
    description: "¡Lleva tu energía donde vayas!",
    products: [
      {
        id: 1,
        name: "Powerbank 10.000 mAh",
        price: 29.99,
        image: "https://placehold.co/200x300"
      },
      {
        id: 2,
        name: "Powerbank solar resistente",
        price: 45.50,
        image: "https://placehold.co/200x300"
      }
    ]
  },
  "paneles-solares": {
    title: "Paneles solares portátiles",
    description: "Energía hasta donde llegue el sol.",
    products: [
      {
        id: 1,
        name: "Panel solar 50W",
        price: 89.99,
        image: "https://placehold.co/200x300"
      },
      {
        id: 2,
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
          <h1 className="text-3xl font-bold text-red-600 mb-4">Categoría no encontrada</h1>
          <p>La categoría <strong>{nombreCategoria}</strong> no existe o fue removida.</p>
        </main>
      ) : (
        <main className="p-8 max-w-5xl mx-auto">
          {/* 🔙 Botón de regreso */}
          <button
            onClick={() => navigate("/categorias")}
            className="mb-6 inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            ← Regresar a todas las categorías
          </button>

          <h1 className="text-4xl font-bold mb-2">{categoria.title}</h1>
          <p className="text-gray-600 mb-8">{categoria.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categoria.products.map(product => (
              <div
                key={product.id}
                className="border rounded-lg p-4 shadow transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 hover:shadow-lg text-center"
              >
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover rounded-lg mb-2"
                />
                <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </main>
      )}
      <Footer />
    </div>
  );
};

export default DetalleCategoria;
