export type PizzaSize = "medium" | "large" | "calzone";

export type CartItem = {
  id: string;
  pizzaId: string;
  name: string;
  image?: string;
  size: PizzaSize;
  quantity: number;
  extras: string[];
  drink: string | null;
  unitPrice: number;
};

const CART_KEY = "sopranos-cart";

export function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(CART_KEY);
    return stored ? (JSON.parse(stored) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: CartItem) {
  const existingCart = readCart();
  const duplicateKey = [item.pizzaId, item.size, item.drink ?? "none", ...item.extras].join("|");

  const nextCart = [...existingCart];
  const index = nextCart.findIndex((existing) => {
    const existingKey = [existing.pizzaId, existing.size, existing.drink ?? "none", ...existing.extras].join("|");
    return existingKey === duplicateKey;
  });

  if (index >= 0) {
    nextCart[index].quantity += item.quantity;
  } else {
    nextCart.push(item);
  }

  saveCart(nextCart);
  return nextCart;
}

export function removeFromCart(itemId: string) {
  const cart = readCart().filter((item) => item.id !== itemId);
  saveCart(cart);
  return cart;
}

export function updateCartItemQuantity(itemId: string, quantity: number) {
  const cart = readCart().map((item) => {
    if (item.id !== itemId) return item;
    const nextQuantity = Math.max(1, quantity);
    return { ...item, quantity: nextQuantity };
  });

  saveCart(cart);
  return cart;
}

export function clearCart() {
  saveCart([]);
  return [];
}
