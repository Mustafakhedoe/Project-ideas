"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/navbar";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const validateEmail = (e: string) => /\S+@\S+\.\S+/.test(e);

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setErrorMsg("");

    if (!name.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Vul alle velden in.");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMsg("Ongeldig e-mailadres.");
      return;
    }

    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body?.error || "Netwerkfout");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Kon niet verzenden.");
    }
  }

  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="hero-inner">
            <p className="eyebrow">CONTACT</p>
            <h1>Heeft u een vraag?</h1>
            <p>We helpen u graag met pizza’s, bestellingen of persoonlijke afspraken.</p>
          </div>
        </section>

        <div className="contact-layout">
          <aside className="contact-info-panel">
            <div className="info-block">
              <span className="info-label">Adres</span>
              <p>Via Roma 24<br />Amsterdam</p>
            </div>

            <div className="info-block">
              <span className="info-label">Telefoon</span>
              <p>020 - 555 0142</p>
            </div>

            <div className="info-block">
              <span className="info-label">E-mail</span>
              <p>hello@sopranos.nl</p>
            </div>

            <div className="info-block">
              <span className="info-label">Openingstijden</span>
              <p>Ma - Za: 12:00 - 22:30<br />Zo: 16:00 - 21:00</p>
            </div>
          </aside>

          <div className="contact-card">
            <div className="card-header">
              <div className="card-title">
                <h2>Stuur ons een bericht</h2>
                <p className="lead">Vul onderstaand formulier in en wij reageren snel.</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              <label className="field">
                <span>Naam</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label className="field">
                <span>E-mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="field">
                <span>Bericht</span>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  required
                />
              </label>

              <div className="actions">
                <button type="submit" className="btn-primary" disabled={status === "sending"}>
                  {status === "sending" ? "Verzenden..." : "Verstuur"}
                </button>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setMessage("");
                    setErrorMsg("");
                    setStatus("idle");
                  }}
                >
                  Wissen
                </button>
              </div>

              {errorMsg && <p className="error">{errorMsg}</p>}
              {status === "success" && <p className="success">Bericht verzonden — we nemen snel contact op.</p>}
            </form>
          </div>
        </div>
      </main>
    </>
  );
}