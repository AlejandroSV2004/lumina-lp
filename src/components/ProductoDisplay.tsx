import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

interface Props {
  product: Producto;
  onBuyNow: () => void;
  usuarioActualId: string | null;
  onActualizarCampo: (campo: string, valor: string | number) => void;
}

const ProductoDisplay: React.FC<Props> = ({
  product,
  onBuyNow,
  usuarioActualId,
  onActualizarCampo,
}) => {
  const navigate = useNavigate();
  const esVendedor = usuarioActualId === product.sellerId;

  const [editando, setEditando] = useState<null | "name" | "descripcion" | "stock">(null);
  const [valorTemp, setValorTemp] = useState<string | number>("");
  const [agregadoOk, setAgregadoOk] = useState(false);
  const [agregando, setAgregando] = useState(false);
  const [eliminando, setEliminando] = useState(false);

  const [editandoImagen, setEditandoImagen] = useState(false);
  const [imagenTemp, setImagenTemp] = useState<string>(product.image || "");
  const [guardandoImagen, setGuardandoImagen] = useState(false);
  const [imagenOk, setImagenOk] = useState(false);

  const API_URL: string = import.meta.env.VITE_API_URL;

  const iniciarEdicion = (campo: "name" | "descripcion" | "stock", valor: string | number) => {
    setEditando(campo);
    setValorTemp(valor);
  };

  const guardarCambios = () => {
    if (editando) {
      onActualizarCampo(editando, valorTemp);
      setEditando(null);
    }
  };

  const agregarAlCarrito = async () => {
    if (!usuarioActualId || product.stock <= 0 || agregando) return;
    setAgregando(true);
    try {
      const res = await fetch(`${API_URL}/carrito/agregar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: usuarioActualId,
          id_producto: product.id,
          cantidad: 1,
        }),
      });
      if (res.ok) {
        setAgregadoOk(true);
        setTimeout(() => setAgregadoOk(false), 2000);
      }
    } finally {
      setAgregando(false);
    }
  };

  const eliminarPublicacion = async () => {
    if (!esVendedor || !usuarioActualId || eliminando) return;
    const confirmar = window.confirm("¿Eliminar esta publicación?");
    if (!confirmar) return;
    setEliminando(true);
    try {
      const res = await fetch(`${API_URL}/producto/${product.id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: usuarioActualId }),
      });
      if (res.ok) {
        alert("Publicación eliminada");
        navigate("/");
      } else {
        const err = await res.json().catch(() => ({} as any));
        alert(err?.error || "No se pudo eliminar");
      }
    } finally {
      setEliminando(false);
    }
  };

  const guardarImagen = async () => {
    if (!esVendedor || !usuarioActualId || guardandoImagen) return;
    setGuardandoImagen(true);
    try {
      const res = await fetch(`${API_URL}/producto/${product.id}/imagen`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_usuario: usuarioActualId, image: imagenTemp }),
      });
      if (res.ok) {
        setEditandoImagen(false);
        setImagenOk(true);
        setTimeout(() => setImagenOk(false), 2000);
      } else {
        const err = await res.json().catch(() => ({} as any));
        alert(err?.error || "No se pudo actualizar la imagen");
      }
    } finally {
      setGuardandoImagen(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
      <div className="relative">
        <img
          src={editandoImagen ? imagenTemp || product.image : imagenTemp || product.image}
          alt={product.name}
          className="w-[300px] h-[400px] object-cover rounded-lg"
        />
        {esVendedor && !editandoImagen && (
          <button
            onClick={() => {
              setImagenTemp(imagenTemp || product.image);
              setEditandoImagen(true);
            }}
            className="absolute top-3 right-3 bg-white/90 border px-3 py-1 rounded text-sm"
          >
            Editar imagen
          </button>
        )}
      </div>

      <div className="flex-1">
        {editandoImagen && (
          <div className="mb-4 flex flex-col sm:flex-row gap-2">
            <input
              type="url"
              value={imagenTemp}
              onChange={(e) => setImagenTemp(e.target.value)}
              placeholder="https://..."
              className="border rounded px-3 py-2 w-full"
            />
            <button
              onClick={guardarImagen}
              disabled={guardandoImagen || !imagenTemp}
              className={`px-4 py-2 rounded ${
                guardandoImagen || !imagenTemp ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Guardar imagen
            </button>
            <button
              onClick={() => {
                setEditandoImagen(false);
                setImagenTemp(product.image || "");
              }}
              className="px-4 py-2 rounded border"
            >
              Cancelar
            </button>
          </div>
        )}

        {imagenOk && (
          <div className="mb-4 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 px-4 py-2 text-sm">
            Imagen actualizada
          </div>
        )}

        <div className="mb-4">
          {editando === "name" ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={valorTemp}
                onChange={(e) => setValorTemp(e.target.value)}
                className="border rounded px-2 py-1"
              />
              <button
                onClick={guardarCambios}
                className="text-blue-600 text-sm hover:underline"
              >
                Guardar
              </button>
            </div>
          ) : (
            <h1 className="text-3xl font-bold">
              {product.name}
              {esVendedor && (
                <span
                  onClick={() => iniciarEdicion("name", product.name)}
                  className="ml-3 text-blue-600 text-sm cursor-pointer hover:underline"
                >
                  Editar
                </span>
              )}
            </h1>
          )}
        </div>

        <div className="mb-6">
          {editando === "descripcion" ? (
            <div className="flex flex-col gap-2">
              <textarea
                value={valorTemp}
                onChange={(e) => setValorTemp(e.target.value)}
                className="border rounded px-2 py-1 w-full"
              />
              <button
                onClick={guardarCambios}
                className="text-blue-600 text-sm hover:underline w-fit"
              >
                Guardar
              </button>
            </div>
          ) : (
            <p className="text-gray-700">
              {product.descripcion}
              {esVendedor && (
                <span
                  onClick={() => iniciarEdicion("descripcion", product.descripcion)}
                  className="ml-3 text-blue-600 text-sm cursor-pointer hover:underline"
                >
                  Editar
                </span>
              )}
            </p>
          )}
        </div>

        <p className="text-2xl font-bold text-blue-600 mb-1">
          ${Number(product.price).toFixed(2)}
        </p>

        <div className="text-gray-600 mb-4">
          {editando === "stock" ? (
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={valorTemp}
                onChange={(e) => setValorTemp(Number(e.target.value))}
                className="border rounded px-2 py-1 w-24"
              />
              <button
                onClick={guardarCambios}
                className="text-blue-600 text-sm hover:underline"
              >
                Guardar
              </button>
            </div>
          ) : (
            <>
              Stock disponible: <strong>{product.stock}</strong>
              {esVendedor && (
                <span
                  onClick={() => iniciarEdicion("stock", product.stock)}
                  className="ml-3 text-blue-600 text-sm cursor-pointer hover:underline"
                >
                  Editar
                </span>
              )}
            </>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-3">
          <button
            onClick={onBuyNow}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Comprar ahora
          </button>
          <button
            onClick={agregarAlCarrito}
            disabled={!usuarioActualId || product.stock <= 0 || agregando}
            className={`px-6 py-2 rounded transition ${
              !usuarioActualId || product.stock <= 0 || agregando
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Agregar al carrito
          </button>
          {esVendedor && (
            <button
              onClick={eliminarPublicacion}
              disabled={eliminando}
              className={`px-6 py-2 rounded transition ${
                eliminando ? "bg-gray-300 text-gray-600 cursor-not-allowed" : "bg-red-600 text-white hover:bg-red-700"
              }`}
            >
              Eliminar publicación
            </button>
          )}
        </div>

        {agregadoOk && (
          <div className="mb-6 rounded border border-emerald-300 bg-emerald-50 text-emerald-800 px-4 py-2 text-sm">
            Agregado al carrito exitosamente
          </div>
        )}

        <div className="text-sm text-gray-600 mb-4">
          <p>
            Vendido por: <strong>{product.sellerName}</strong>{" "}
            <Link
              to={`/perfil/${product.sellerId}`}
              className="text-blue-600 ml-2 hover:underline text-sm"
            >
              Ver perfil
            </Link>
          </p>
          <p>
            Contacto:{" "}
            <a
              href={`mailto:${product.sellerEmail}`}
              className="text-blue-500 underline"
            >
              {product.sellerEmail}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductoDisplay;
