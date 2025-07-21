import React, { useState, useEffect } from 'react';
import {
  getCart,
  removeFromCart,
  decreaseQuantity,
  clearCart
} from '../../data/cart';
import { Button } from '@/components/ui/button';
import { useCart } from '../../context/CartContext';
import { products } from '../../data/products';
import { Link } from 'react-router-dom';

const Cart = () => {
  const [cartItems, setCartItems] = useState(getCart());
  const [recommended, setRecommended] = useState<typeof products>([]);
  const { addToCart, refreshCart } = useCart();
  const [forceUpdate, setForceUpdate] = useState(false); // ✅

  useEffect(() => {
    const cart = getCart();
    setCartItems(cart);

    if (cart.length === 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random());
      setRecommended(shuffled.slice(0, 3));
    } else {
      setRecommended([]);
    }
  }, [forceUpdate]); // ✅ Dependemos de forceUpdate

  const triggerUpdate = () => setForceUpdate(prev => !prev); // ✅ Alterna valor

  const handleRemove = (id: string) => {
    removeFromCart(id);
    refreshCart();
    triggerUpdate();
  };

  const handleDecrease = (id: string) => {
    decreaseQuantity(id);
    refreshCart();
    triggerUpdate();
  };

  const handleIncrease = (id: string) => {
    addToCart(id);
    refreshCart();
    triggerUpdate();
  };

  const handleClear = () => {
    clearCart();
    refreshCart();
    triggerUpdate();
  };

  const handlePurchase = () => {
    if (cartItems.length > 0) {
      alert("¡Compra realizada exitosamente!");
      clearCart();
      refreshCart();
      triggerUpdate();
    }
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <section className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">🛒 Tu carrito</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 space-y-6">
          <div>
            <p>Tu carrito está vacío.</p>
            <a
              href="/categorias"
              className="inline-block text-blue-600 hover:underline font-medium"
            >
              Explorar categorías
            </a>
          </div>

          {/* ✅ Productos recomendados */}
          {recommended.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Productos recomendados
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {recommended.map((product) => (
                  <div
                    key={product.id}
                    className="border p-4 rounded-lg shadow hover:shadow-lg transition flex flex-col items-center text-center"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-40 object-cover rounded mb-3"
                    />
                    <h4 className="font-semibold text-base md:text-lg mb-1 line-clamp-2">
                      {product.name}
                    </h4>
                    <p className="text-blue-600 font-bold text-base mb-3">
                      ${product.price.toFixed(2)}
                    </p>
                    <Button
                      size="sm"
                      onClick={() => {
                        addToCart(product.id);
                        refreshCart();
                        triggerUpdate(); // ✅ Forzar re-render y ocultar recomendados
                      }}
                    >
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
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-4"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  ${item.price} x {item.quantity} = $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => handleDecrease(item.id)}>
                  -
                </Button>
                <span className="text-sm">{item.quantity}</span>
                <Button variant="outline" size="sm" onClick={() => handleIncrease(item.id)}>
                  +
                </Button>
                <Button variant="outline" size="sm" onClick={() => handleRemove(item.id)}>
                  Eliminar
                </Button>
              </div>
            </div>
          ))}

          <div className="pt-4 border-t flex justify-between items-center">
            <span className="text-xl font-bold">Total:</span>
            <span className="text-xl text-green-600 font-semibold">
              ${total.toFixed(2)}
            </span>
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

