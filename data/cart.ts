import { products } from './products';

export type CartItem = {
  id: string;
  quantity: number;
};

let cart: CartItem[] = [];

// Obtener todos los productos del carrito con sus detalles
export function getCart() {
  return cart.map(item => {
    const product = products.find(p => p.id === item.id);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean);
}

// Agregar producto (o incrementar cantidad)
export function addToCart(productId: string) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }
}

// Eliminar producto del carrito completamente
export function removeFromCart(productId: string) {
  cart = cart.filter(item => item.id !== productId);
}

// Disminuir cantidad
export function decreaseQuantity(productId: string) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity -= 1;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    }
  }
}

// Vaciar el carrito
export function clearCart() {
  cart = [];
}

export function getCartCount() {
  return cart.reduce((acc, item) => acc + item.quantity, 0);
}
