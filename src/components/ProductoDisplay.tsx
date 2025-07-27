import React, { useState } from "react";
import { Link } from "react-router-dom";

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
  const esVendedor = usuarioActualId === product.sellerId;

  const [editando, setEditando] = useState<null | "name" | "descripcion" | "stock">(null);
  const [valorTemp, setValorTemp] = useState<string | number>("");

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

  return (
    <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
      <img
        src={product.image}
        alt={product.name}
        className="w-[300px] h-[400px] object-cover rounded-lg"
      />

      <div className="flex-1">
        {/* Nombre */}
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

        {/* Descripción */}
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

        {/* Precio */}
        <p className="text-2xl font-bold text-blue-600 mb-1">
          ${Number(product.price).toFixed(2)}
        </p>

        {/* Stock */}
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

        {/* Botón comprar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={onBuyNow}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
          >
            Comprar ahora
          </button>
        </div>

        {/* Info vendedor */}
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
