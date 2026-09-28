"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/app/components/navbar";
import { drinks, iceCreams, type MenuProduct } from "@/app/data/menu-products";

const categoryLabels: Record<MenuProduct["category"], string> = {
  drank: "Dranken",
  ijs: "IJs",
};

function ProductFilterContent() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") as MenuProduct["category"] | null;
  const items = category === "drank" ? drinks : category === "ijs" ? iceCreams : [...drinks, ...iceCreams];

  return (
    <>
      <header className="section-heading">
        <p>Onze selectie</p>
        <h2>{category ? `${categoryLabels[category]}` : "Dranken & ijs"}</h2>
      </header>

      <nav className="filter-bar" aria-label="Filter producten per categorie">
        <Link href="/producten" className={`filter-link ${!category ? "active" : ""}`}>
          Alles
        </Link>
        {Object.entries(categoryLabels).map(([slug, label]) => (
          <Link
            key={slug}
            href={`/producten?category=${slug}`}
            className={`filter-link ${category === slug ? "active" : ""}`}
          >
            {label}
          </Link>
        ))}
      </nav>

      <section className="pizza-grid">
        {items.map((product) => (
          <article key={product.id} className="pizza-card">
            <div className="pizza-media">
              <img
                src={product.image || "/images/pizzas/placeholder.png"}
                alt={product.name}
                loading="lazy"
              />
            </div>
            <div className="pizza-body">
              <h3>{product.name}</h3>
              <p className="desc">{product.description}</p>
              <div className="prices">
                <span>€{product.price.toFixed(2)}</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main className="pizzas-page">
        <Suspense
          fallback={
            <div className="section-heading">
              <p>Onze selectie</p>
              <h2>Producten laden...</h2>
            </div>
          }
        >
          <ProductFilterContent />
        </Suspense>
      </main>
    </>
  );
}
