import Navbar from "@/app/components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-small">SOPRANOS PIZZA</p>

            <h1>
              <span className="hero-word hero-word-light">PIZZA</span>
              <span className="hero-word hero-word-dark">MADE RIGHT.</span>
            </h1>

            <p className="hero-text">
              Vers uit de oven. Krokante bodem. Veel smaak.
            </p>

            <Link href="/pizzas" className="order-button">
              BESTEL NU <span>→</span>
            </Link>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="pizza-shadow" />
            <div className="pizza-slice">
              <span className="ingredient ingredient-1" />
              <span className="ingredient ingredient-2" />
              <span className="ingredient ingredient-3" />
              <span className="ingredient ingredient-4" />
            </div>
          </div>
        </section>

        <section className="categories">
          <div className="section-heading">
            <p>ONZE MENUKAART</p>
            <h2>KIES JE PIZZA</h2>
          </div>

          <div className="category-grid">

            <div className="category-card vegetarian">
              <div className="card-content">
                <h3>VEGETARISCH</h3>
                <p>
                  Verse groenten, kaas en heerlijke Italiaanse smaken.
                </p>
                <Link href="/pizzas?category=vegetarian" className="category-cta">BEKIJK PIZZA'S →</Link>
              </div>
            </div>

            <div className="category-card meat">
              <div className="card-content">
                <h3>VLEES</h3>
                <p>
                  Voor de echte liefhebber van een stevige pizza.
                </p>
                <Link href="/pizzas?category=meat" className="category-cta">BEKIJK PIZZA'S →</Link>
              </div>
            </div>

            <div className="category-card fish">
              <div className="card-content">
                <h3>VIS</h3>
                <p>
                  Verse vis gecombineerd met onze beste ingrediënten.
                </p>
                <Link href="/pizzas?category=fish" className="category-cta">BEKIJK PIZZA'S →</Link>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}