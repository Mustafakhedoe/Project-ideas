"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useState } from "react";
import Navbar from "@/app/components/navbar";

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const orderPlaced = searchParams.get("orderPlaced") === "1";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Vul e-mail en wachtwoord in.");
      return;
    }

    const valid = email === "bakker@sopranos.nl" && password === "pizza123";
    if (!valid) {
      setError("Ongeldige bakkerlogin. Gebruik: bakker@sopranos.nl / pizza123");
      return;
    }

    router.push("/bakker");
  };

  return (
    <>
      <Navbar />

      <main className="login-page">
        <div className="login-card">
          <div className="login-head">
            <div className="login-brand">Sopranos Pizza</div>
            <div>
              <h2>Inloggen</h2>
              <p className="lead">Log in om je bestellingen te beheren.</p>
            </div>
          </div>

          {orderPlaced && (
            <p className="success">Bestelling geplaatst. Log in om de bakkerstatus te bekijken.</p>
          )}

          <form onSubmit={submit} className="login-form">
            <label className="field">
              <span>E-mail</span>
              <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label className="field">
              <span>Wachtwoord</span>
              <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>

            <div className="actions">
              <button className="btn-primary" type="submit">Inloggen</button>
              <a className="forgot" href="#">Wachtwoord vergeten?</a>
            </div>

            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </main>
    </>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="login-page"><div className="login-card"><p>Login laden...</p></div></div>}>
      <LoginContent />
    </Suspense>
  );
}