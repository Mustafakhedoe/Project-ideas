"use client";

import React, { useState } from "react";
import Navbar from "@/app/components/navbar";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Vul e-mail en wachtwoord in.");
      return;
    }
    // TODO: call auth API
    setError("Inloggen niet geconfigureerd in demo.");
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