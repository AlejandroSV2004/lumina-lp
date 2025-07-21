import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { products } from "../../data/products";
import { useCart } from "../../context/CartContext"; // ✅ Usar contexto del carrito

const Producto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart(); // ✅ Agregar desde el contexto

  const product = products.find((p) => p.id === id);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id);
      alert("Se agregó al carrito");
    }
  };

  const handleBuyNow = () => {
    alert("¡Comprado exitosamente!");
    // Aquí podrías simular checkout o redirección
  };

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

              <p className="text-2xl font-bold text-blue-600 mb-4">
                ${product.price.toFixed(2)}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button
                  onClick={handleBuyNow}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Comprar ahora
                </button>
                <button
                  onClick={handleAddToCart}
                  className="border border-blue-600 text-blue-600 px-6 py-2 rounded hover:bg-blue-50 transition"
                >
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
