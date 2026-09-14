import Navbar from "@/app/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home-page">
        <section className="hero">
          <div className="hero-content">
            <p className="hero-small">SOPRANOS PIZZA</p>

            <h1>
              PIZZA
              <br />
              <span>MADE RIGHT.</span>
            </h1>

            <p className="hero-text">
              Vers uit de oven. Krokante bodem. Veel smaak.
            </p>

            <button className="order-button">
              BESTEL NU →
            </button>
          </div>

          <div className="hero-pizza">
            🍕
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
                <span>🥬</span>
                <h3>VEGETARISCH</h3>
                <p>
                  Verse groenten, kaas en heerlijke Italiaanse smaken.
                </p>
                <button>BEKIJK PIZZA'S →</button>
              </div>
            </div>

            <div className="category-card meat">
              <div className="card-content">
                <span>🥩</span>
                <h3>VLEES</h3>
                <p>
                  Voor de echte liefhebber van een stevige pizza.
                </p>
                <button>BEKIJK PIZZA'S →</button>
              </div>
            </div>

            <div className="category-card fish">
              <div className="card-content">
                <span>🐟</span>
                <h3>VIS</h3>
                <p>
                  Verse vis gecombineerd met onze beste ingrediënten.
                </p>
                <button>BEKIJK PIZZA'S →</button>
              </div>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}