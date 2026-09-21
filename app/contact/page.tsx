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
        <div className="contact-card">
          <div className="card-header">
            <div className="card-title">
              <h1>Contact</h1>
              <p className="lead">Vul onderstaand formulier in om contact op te nemen met Sopranos Pizza.</p>
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
      </main>
    </>
  );
}