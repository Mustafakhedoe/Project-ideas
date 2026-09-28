"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import pizzas, { type Pizza } from "@/app/data/pizzas";
import PizzaCard from "./PizzaCard";

const categoryLabels: Record<Pizza["category"], string> = {
  vegetarian: "Vegetarisch",
  meat: "Vlees",
  fish: "Vis",
};

function PizzaFilterContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as Pizza["category"] | null;
  const filteredPizzas = category
    ? pizzas.filter((pizza) => pizza.category === category)
    : pizzas;

  return (
    <>
      <header className="section-heading">
        <p>Onze selectie</p>
        <h2>{category ? `${categoryLabels[category]} pizza's` : "Alle pizza's"}</h2>
      </header>

      <nav className="filter-bar" aria-label="Filter pizza's per categorie">
        <Link
          href="/pizzas"
          className={`filter-link ${!category ? "active" : ""}`}
        >
          Alles
        </Link>
        {Object.entries(categoryLabels).map(([slug, label]) => (
          <Link
            key={slug}
            href={`/pizzas?category=${slug}`}
            className={`filter-link ${category === slug ? "active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <section className="pizza-grid">
        {filteredPizzas.map((p) => (
          <PizzaCard key={p.id} pizza={p} />
        ))}
      </section>
    </>
  );
}

export default function PizzasPage() {
  return (
    <>
      <Navbar />
      <main className="pizzas-page">
        <Suspense
          fallback={
            <div className="section-heading">
              <p>Onze selectie</p>
              <h2>Pizza's laden...</h2>
            </div>
          }
        >
          <PizzaFilterContent />
        </Suspense>
      </main>
    </>
  );
}
