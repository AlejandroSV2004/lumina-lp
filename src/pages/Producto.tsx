import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Resenas from "../components/Resenas";
import ProductoDisplay from "../components/ProductoDisplay";
import FormularioResena from "../components/FormularioResena";

const API = import.meta.env.VITE_API_URL;


interface Producto {
  id: number;
  name: string;
  descripcion: string;
  price: string | number;
  image: string;
  sellerId: string;
  sellerName: string;
  sellerEmail: string;
  stock: number;
}

interface Resena {
  id: number;
  id_usuario: string;
  nombre_usuario: string;
  calificacion: number;
  comentario: string;
  fecha: string;
}

const Producto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Producto | null>(null);
  const [resenas, setResenas] = useState<Resena[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usuarioActual, setUsuarioActual] = useState<string | null>(null);

  useEffect(() => {
    const usuario = localStorage.getItem("usuario");
    if (usuario) {
      const parsed = JSON.parse(usuario);
      setUsuarioActual(parsed.id_usuario);
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`${API}/api/producto/${id}`);
        if (!res.ok) throw new Error("Producto no encontrado");
        const data = await res.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError("Producto no encontrado o error del servidor");
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    const fetchResenas = async () => {
      try {
        const res = await fetch(`${API}/api/resenas/${id}`);
        const data = await res.json();
        setResenas(data);
      } catch (err) {
        console.error("Error al obtener reseñas:", err);
      }
    };

    fetchProduct();
    fetchResenas();
  }, [id]);

  const handleBuyNow = () => {
    alert("¡Comprado exitosamente!");
  };


  const handleEliminarResena = async (idResena: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta reseña?")) return;

    try {
      const res = await fetch(`${API}/api/resenas/${idResena}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        alert("Error al eliminar reseña");
        return;
      }

      const nuevas = resenas.filter((r) => r.id !== idResena);
      setResenas(nuevas);
    } catch (err) {
      alert("Error de servidor al eliminar");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between">
      <Header />

      {loading ? (
        <main className="p-8 text-center text-gray-500">Cargando producto...</main>
      ) : error || !product ? (
        <main className="p-8 text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">{error}</h1>
          <button
            onClick={() => navigate("/categorias")}
            className="mt-4 text-blue-600 font-semibold hover:underline"
          >
            ← Regresar a categorías
          </button>
        </main>
      ) : (
        <main className="p-8 max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center text-blue-600 font-semibold hover:underline"
          >
            ← Regresar
          </button>

          {/* Producto */}
          <ProductoDisplay
  product={product}
  onBuyNow={handleBuyNow}
  usuarioActualId={usuarioActual}
  onActualizarCampo={async (campo, valor) => {
    try {
      const res = await fetch(`${API}/api/producto/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [campo]: valor }),
      });
      if (res.ok) {
        setProduct((prev) => prev && { ...prev, [campo]: valor });
      } else {
        alert("Error al actualizar");
      }
    } catch (err) {
      alert("Error del servidor");
    }
  }}
/>


          {/* Formulario reseña */}
          <FormularioResena
  productoId={id}
  onResenaEnviada={(nuevas) => setResenas(nuevas)}
/>


          {/* ✅ Componente de reseñas */}
          <Resenas
            resenas={resenas}
            usuarioActual={usuarioActual}
            onEliminarResena={handleEliminarResena}
          />
        </main>
      )}

      <Footer />
    </div>
  );
};

export default Producto;
