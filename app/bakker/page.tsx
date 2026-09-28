"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { readOrders, updateOrderStatus, type Order } from "@/app/lib/orders";

const statusLabels = {
  todo: "Nieuw",
  bezig: "Bezig",
  done: "Done",
};

export default function BakerPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | Order["status"]>("all");

  useEffect(() => {
    setOrders(readOrders());
  }, []);

  const refresh = () => setOrders(readOrders());

  const handleStatusChange = (orderId: string, status: Order["status"]) => {
    updateOrderStatus(orderId, status);
    refresh();
  };

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders;
    return orders.filter((order) => order.status === statusFilter);
  }, [orders, statusFilter]);

  const counts = useMemo(
    () => ({
      todo: orders.filter((order) => order.status === "todo").length,
      bezig: orders.filter((order) => order.status === "bezig").length,
      done: orders.filter((order) => order.status === "done").length,
    }),
    [orders]
  );

  return (
    <main className="bakker-page">
      <header className="section-heading bakker-header">
        <p>Bakkerpaneel</p>
        <h2>Bestellingen</h2>
      </header>

      <div className="bakker-toolbar">
        <div className="status-summary">
          <span>Nieuw: {counts.todo}</span>
          <span>Bezig: {counts.bezig}</span>
          <span>Done: {counts.done}</span>
        </div>

        <div className="filter-row">
          <button type="button" className={statusFilter === "all" ? "active" : ""} onClick={() => setStatusFilter("all")}>
            Alles
          </button>
          <button type="button" className={statusFilter === "todo" ? "active" : ""} onClick={() => setStatusFilter("todo")}>
            Nieuw
          </button>
          <button type="button" className={statusFilter === "bezig" ? "active" : ""} onClick={() => setStatusFilter("bezig")}>
            Bezig
          </button>
          <button type="button" className={statusFilter === "done" ? "active" : ""} onClick={() => setStatusFilter("done")}>
            Done
          </button>
        </div>

        <Link href="/pizzas" className="btn-primary back-menu-link">
          Naar menu
        </Link>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="empty-cart">
          <p>Er zijn nog geen bestellingen binnengekomen voor deze status.</p>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => {
            const customer = order.customer ?? {
              name: order.customerName ?? "Klant",
              phone: "",
              address: "",
              postcode: "",
              note: "",
            };

            return (
              <article key={order.id} className="order-card">
              <div className="order-card-header">
                <div>
                  <p className="order-id">{order.id}</p>
                  <h3>{order.customerName || customer.name || "Klant"}</h3>
                </div>
                <span className={`status-pill status-${order.status}`}>
                  {statusLabels[order.status]}
                </span>
              </div>

              <div className="customer-details">
                <p><strong>Telefoon:</strong> {customer.phone || "-"}</p>
                <p><strong>Adres:</strong> {customer.address || "-"}</p>
                <p><strong>Postcode:</strong> {customer.postcode || "-"}</p>
                {customer.note ? <p><strong>Opmerking:</strong> {customer.note}</p> : null}
              </div>

              <ul className="order-items">
                {order.items.map((item) => (
                  <li key={`${order.id}-${item.id}`}>
                    {item.quantity}x {item.name} ({item.size})
                    {item.extras.length > 0 ? ` + ${item.extras.join(", ")}` : ""}
                    {item.drink ? ` + ${item.drink}` : ""}
                  </li>
                ))}
              </ul>

              <div className="order-footer">
                <strong>Totaal: €{(order.total ?? 0).toFixed(2)}</strong>
                <div className="order-actions">
                  <button type="button" onClick={() => handleStatusChange(order.id, "todo")}>
                    Nieuw
                  </button>
                  <button type="button" onClick={() => handleStatusChange(order.id, "bezig")}>
                    Bezig
                  </button>
                  <button type="button" onClick={() => handleStatusChange(order.id, "done")}>
                    Done
                  </button>
                </div>
              </div>
            </article>
            );
          })}
        </div>
      )}
    </main>
  );
}
