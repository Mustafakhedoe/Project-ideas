import Navbar from "@/app/components/navbar";
import pizzas from "@/app/data/pizzas";
import PizzaCard from "./PizzaCard";

export default function PizzasPage() {
  return (
    <>
      <Navbar />
      <main className="pizzas-page">
        <header className="section-heading">
          <p>Onze selectie</p>
          <h2>Alle pizza's</h2>
        </header>

        <section className="pizza-grid">
          {pizzas.map((p) => (
            <PizzaCard key={p.id} pizza={p} />
          ))}
        </section>
      </main>
    </>
  );
}
