import Navbar from "@/app/components/navbar";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="home">
        <section className="hero">
          <h1>Sopranos Pizza</h1>
          <p>De lekkerste pizza's, vers bereid voor jou.</p>
        </section>

        <section className="categories">
          <h2>Onze pizza's</h2>

          <div className="category-grid">

            <div className="category-card">
              <div className="category-icon">🥬</div>
              <h3>Vegetarische pizza</h3>
              <p>
                Heerlijke pizza's met verse groenten en zonder vlees.
              </p>
              <button>Bekijk pizza's</button>
            </div>

            <div className="category-card">
              <div className="category-icon">🥩</div>
              <h3>Vlees pizza</h3>
              <p>
                Smaakvolle pizza's met verschillende soorten vlees.
              </p>
              <button>Bekijk pizza's</button>
            </div>

            <div className="category-card">
              <div className="category-icon">🐟</div>
              <h3>Vis pizza</h3>
              <p>
                Lekkere pizza's met vis en andere verse ingrediënten.
              </p>
              <button>Bekijk pizza's</button>
            </div>

          </div>
        </section>
      </main>
    </>
  );
}