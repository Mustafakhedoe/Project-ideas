import type { CartItem } from "@/app/lib/cart";

export type OrderStatus = "todo" | "bezig" | "done";

export type DeliveryDetails = {
  name: string;
  phone: string;
  address: string;
  postcode: string;
  note?: string;
};

export type Order = {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customerName: string;
  customer: DeliveryDetails;
  items: CartItem[];
  total: number;
};

const ORDERS_KEY = "sopranos-orders";

function normalizeOrder(input: any): Order {
  const customer = input?.customer ?? {
    name: input?.customerName ?? "Klant",
    phone: "",
    address: "",
    postcode: "",
    note: "",
  };

  return {
    id: input?.id ?? `ORD-${Date.now()}`,
    createdAt: input?.createdAt ?? new Date().toISOString(),
    status: input?.status === "bezig" || input?.status === "done" || input?.status === "todo" ? input.status : "todo",
    customerName: input?.customerName ?? customer.name ?? "Klant",
    customer: {
      name: customer.name ?? input?.customerName ?? "Klant",
      phone: customer.phone ?? "",
      address: customer.address ?? "",
      postcode: customer.postcode ?? "",
      note: customer.note ?? "",
    },
    items: Array.isArray(input?.items) ? input.items : [],
    total: typeof input?.total === "number" ? input.total : 0,
  };
}

export function readOrders(): Order[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = window.localStorage.getItem(ORDERS_KEY);
    if (!stored) return [];

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.map(normalizeOrder) : [];
  } catch {
    return [];
  }
}

export function saveOrders(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function createOrderFromCart(
  items: CartItem[],
  customer: DeliveryDetails = {
    name: "Klant",
    phone: "",
    address: "",
    postcode: "",
    note: "",
  }
) {
  const total = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const order: Order = {
    id: `ORD-${Date.now()}`,
    createdAt: new Date().toISOString(),
    status: "todo",
    customerName: customer.name || "Klant",
    customer: {
      name: customer.name || "Klant",
      phone: customer.phone || "",
      address: customer.address || "",
      postcode: customer.postcode || "",
      note: customer.note || "",
    },
    items,
    total,
  };

  const orders = [...readOrders(), order];
  saveOrders(orders);
  return order;
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const orders = readOrders().map((order) =>
    order.id === orderId ? { ...order, status } : order
  );

  saveOrders(orders);
  return orders;
}
