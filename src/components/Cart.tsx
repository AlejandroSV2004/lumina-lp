import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type ItemCarrito = {
  id_producto: number;
  nombre: string;
  precio: number;
  cantidad: number;
  imagen?: string | null;
};

type Producto = {
  id_producto: number;
  nombre: string;
  precio: number;
  stock: number;
  imagen?: string | null;
};

const Cart = () => {
  const usuario = JSON.parse(localStorage.getItem("usuario") || "{}");
  const [cartItems, setCartItems] = useState<ItemCarrito[]>([]);
  const [recommended, setRecommended] = useState<Producto[]>([]);
  const [forceUpdate, setForceUpdate] = useState(false);

  const API_URL: string = import.meta.env.VITE_API_URL;

  const triggerUpdate = () => setForceUpdate((prev) => !prev);

  useEffect(() => {
    const fetchCart = async () => {
      if (!usuario?.id_usuario) return;
      const res = await fetch(`${API_URL}/carrito/${usuario.id_usuario}`);
      const data: ItemCarrito[] = await res.json();
      setCartItems(data);
      if (data.length === 0) {
        const rec = await fetch(`${API_URL}/productos/recomendados`);
        const productos: Producto[] = await rec.json();
        setRecommended(productos);
      } else {
        setRecommended([]);
      }
    };
    fetchCart();
  }, [forceUpdate, usuario?.id_usuario, API_URL]);

  const handleRemove = async (id_producto: number) => {
    await fetch(`${API_URL}/carrito/${usuario.id_usuario}/${id_producto}`, {
      method: "DELETE",
    });
    triggerUpdate();
  };

  const handleDecrease = async (id_producto: number) => {
    await fetch(`${API_URL}/carrito/disminuir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: usuario.id_usuario, id_producto }),
    });
    triggerUpdate();
  };

  const handleIncrease = async (id_producto: number) => {
    await fetch(`${API_URL}/carrito/agregar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: usuario.id_usuario, id_producto, cantidad: 1 }),
    });
    triggerUpdate();
  };

  const handleClear = async () => {
    await fetch(`${API_URL}/carrito/vaciar/${usuario.id_usuario}`, {
      method: "DELETE",
    });
    triggerUpdate();
  };

  const handlePurchase = () => {
    if (cartItems.length > 0) {
      alert("Compra realizada exitosamente");
      handleClear();
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <section className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Tu carrito</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 space-y-6">
          <div>
            <p>Tu carrito está vacío.</p>
            <Link to="/categorias" className="inline-block text-blue-600 hover:underline font-medium">
              Explorar categorías
            </Link>
          </div>
          {recommended.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Productos recomendados</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommended.map((product) => (
                  <div
                    key={product.id_producto}
                    className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
                  >
                    {product.imagen && (
                      <img src={product.imagen} alt={product.nombre} className="w-full h-40 object-cover rounded mb-3" />
                    )}
                    <h4 className="font-semibold text-base md:text-lg mb-1 line-clamp-2">{product.nombre}</h4>
                    <p className="text-blue-600 font-bold text-base mb-3">
                      ${Number(product.precio).toFixed(2)}
                    </p>
                    <Button size="sm" onClick={() => handleIncrease(product.id_producto)} disabled={product.stock <= 0}>
                      Agregar al carrito
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div key={item.id_producto} className="flex justify-between items-center border-b pb-4">
              <div className="flex items-center gap-3">
                {item.imagen && <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded" />}
                <div>
                  <h3 className="text-lg font-semibold">{item.nombre}</h3>
                  <p className="text-sm text-gray-500">
                    ${item.precio} x {item.cantidad} = {(item.precio * item.cantidad).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDecrease(item.id_producto)}>
                  -
                </Button>
                <span className="text-sm">{item.cantidad}</span>
                <Button variant="outline" size="sm" onClick={() => handleIncrease(item.id_producto)}>
                  +
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleRemove(item.id_producto)}>
                  Eliminar
                </Button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl text-green-600 font-semibold">${total.toFixed(2)}</span>
          </div>

          <div className="flex justify-end gap-4 mt-4">
            <Button variant="default" onClick={handlePurchase}>
              Comprar
            </Button>
            <Button variant="destructive" onClick={handleClear}>
              Vaciar carrito
            </Button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Cart;
