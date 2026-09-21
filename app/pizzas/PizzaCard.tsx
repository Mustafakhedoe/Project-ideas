"use client";

import React, { useState } from "react";
import type { Pizza } from "@/app/data/pizzas";

export default function PizzaCard({ pizza }: { pizza: Pizza }) {
  const [errored, setErrored] = useState(false);
  // Prefer static assets from `public/images/pizzas` which Next serves at `/images/pizzas/*`.
  // Map pizza ids to those public image paths.
  const localMap: Record<string, string> = {
    margherita: "/images/pizzas/margherita.png",
    "veggie-deluxe": "/images/pizzas/veggie.png",
    pepperoni: "/images/pizzas/pepperoni.png",
    "bbq-chicken": "/images/pizzas/bbq.png",
    tonno: "/images/pizzas/tonno.png",
    "frutti-di-mare": "/images/pizzas/frutti.png",
  };

  return (
    <article className="pizza-card">
      <div className="pizza-media">
        {!errored ? (
          <img
            src={localMap[pizza.id] || pizza.image || "/images/pizzas/placeholder.png"}
            alt={pizza.name}
            loading="lazy"
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="pizza-fallback">
            <div className="pizza-fallback-inner">{pizza.name}</div>
          </div>
        )}
      </div>

      <div className="pizza-body">
        <h3>{pizza.name}</h3>
        <p className="desc">{pizza.description}</p>
        <div className="prices">
          <span>M €{pizza.prices.medium.toFixed(2)}</span>
          <span>L €{pizza.prices.large.toFixed(2)}</span>
          <span>C €{pizza.prices.calzone.toFixed(2)}</span>
        </div>
      </div>
    </article>
  );
}
