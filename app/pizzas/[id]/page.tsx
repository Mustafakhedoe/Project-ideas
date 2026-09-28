"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Navbar from "@/app/components/navbar";
import pizzas, { type Pizza } from "@/app/data/pizzas";
import { addToCart, type PizzaSize } from "@/app/lib/cart";

const extraOptions = [
  { id: "extra-kaas", label: "Extra kaas", price: 1.5 },
  { id: "olijven", label: "Olijven", price: 1.2 },
  { id: "chili", label: "Chili flakes", price: 0.7 },
  { id: "ijs", label: "Ijs", price: 2.5 },
];

const drinkOptions = [
  { id: "cola", label: "Cola", price: 2.5 },
  { id: "fanta", label: "Fanta", price: 2.5 },
  { id: "water", label: "Water", price: 1.7 },
];

export default function PizzaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [size, setSize] = useState<PizzaSize>("medium");
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedDrink, setSelectedDrink] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  useMemo(() => {
    params.then((value) => setResolvedParams(value));
  }, [params]);

  if (!resolvedParams) return null;

  const pizza = pizzas.find((item) => item.id === resolvedParams.id);
  if (!pizza) return notFound();

  const sizeMeta: Record<PizzaSize, { label: string; price: number }> = {
    medium: { label: "Medium", price: pizza.prices.medium },
    large: { label: "Large", price: pizza.prices.large },
    calzone: { label: "Calzone", price: pizza.prices.calzone },
  };

  const extraMap = Object.fromEntries(extraOptions.map((item) => [item.id, item]));
  const drinkMap = Object.fromEntries(drinkOptions.map((item) => [item.id, item]));

  const extraTotal = selectedExtras.reduce((sum, id) => sum + (extraMap[id]?.price ?? 0), 0);
  const drinkTotal = selectedDrink ? drinkMap[selectedDrink]?.price ?? 0 : 0;
  const unitPrice = sizeMeta[size].price + extraTotal + drinkTotal;
  const total = unitPrice * quantity;

  const toggleExtra = (id: string) => {
    setSelectedExtras((current) =>
      current.includes(id) ? current.filter((value) => value !== id) : [...current, id]
    );
  };

  const handleAddToCart = () => {
    const item = {
      id: `${pizza.id}-${size}-${selectedDrink ?? "none"}-${selectedExtras.join("-")}`,
      pizzaId: pizza.id,
      name: pizza.name,
      image: pizza.image,
      size,
      quantity,
      extras: selectedExtras.map((id) => extraMap[id].label),
      drink: selectedDrink ? drinkMap[selectedDrink].label : null,
      unitPrice,
    };

    addToCart(item);
    router.push("/cart");
  };

  return (
    <>
      <Navbar />
      <main className="product-page">
        <div className="product-layout">
          <div className="product-image-wrap">
            <img src={pizza.image || "/images/pizzas/placeholder.png"} alt={pizza.name} className="product-image" />
          </div>

          <div className="product-details">
            <p className="eyebrow">Sopranos Pizza</p>
            <h1>{pizza.name}</h1>
            <p className="product-description">{pizza.description}</p>

            <div className="size-picker">
              {Object.entries(sizeMeta).map(([slug, option]) => (
                <button
                  type="button"
                  key={slug}
                  className={`size-option ${size === slug ? "selected" : ""}`}
                  onClick={() => setSize(slug as PizzaSize)}
                >
                  <span>{option.label}</span>
                  <strong>€{option.price.toFixed(2)}</strong>
                </button>
              ))}
            </div>

            <div className="option-group">
              <h3>Extras</h3>
              {extraOptions.map((option) => (
                <label key={option.id} className="option-row">
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(option.id)}
                    onChange={() => toggleExtra(option.id)}
                  />
                  <span>{option.label}</span>
                  <strong>€{option.price.toFixed(2)}</strong>
                </label>
              ))}
            </div>

            <div className="option-group">
              <h3>Drinken</h3>
              {drinkOptions.map((option) => (
                <label key={option.id} className="option-row">
                  <input
                    type="radio"
                    name="drink"
                    checked={selectedDrink === option.id}
                    onChange={() => setSelectedDrink(option.id)}
                  />
                  <span>{option.label}</span>
                  <strong>€{option.price.toFixed(2)}</strong>
                </label>
              ))}
            </div>

            <div className="quantity-row">
              <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))}>-</button>
              <span>{quantity}</span>
              <button type="button" onClick={() => setQuantity((value) => value + 1)}>+</button>
            </div>

            <div className="summary-box">
              <div>
                <span>Subtotal</span>
                <strong>€{total.toFixed(2)}</strong>
              </div>
            </div>

            <div className="detail-actions">
              <button type="button" className="btn-primary" onClick={handleAddToCart}>
                Voeg toe aan winkelmand
              </button>
              <Link href="/pizzas" className="btn-secondary secondary-link">
                Terug naar menu
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
