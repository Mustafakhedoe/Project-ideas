"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/app/components/navbar";
import { clearCart, readCart, removeFromCart, updateCartItemQuantity, type CartItem } from "@/app/lib/cart";
import { createOrderFromCart } from "@/app/lib/orders";

export default function CartPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setItems(readCart());
  }, []);

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [items]
  );

  const updateQuantity = (itemId: string, quantity: number) => {
    const nextItems = updateCartItemQuantity(itemId, quantity);
    setItems(nextItems);
  };

  const removeItem = (itemId: string) => {
    const nextItems = removeFromCart(itemId);
    setItems(nextItems);
  };

  const handleOrder = () => {
    if (items.length === 0) return;

    if (!customerName.trim() || !phone.trim() || !address.trim() || !postcode.trim()) {
      setError("Vul je naam, telefoon, adres en postcode in.");
      return;
    }

    const finalName = customerName.trim();
    createOrderFromCart(items, {
      name: finalName,
      phone: phone.trim(),
      address: address.trim(),
      postcode: postcode.trim(),
      note: note.trim(),
    });

    clearCart();
    setItems([]);
    setCustomerName("");
    setPhone("");
    setAddress("");
    setPostcode("");
    setNote("");
    setError("");
    router.push("/login?orderPlaced=1");
  };

  return (
    <>
      <Navbar />
      <main className="cart-page">
        <div className="cart-shell">
          <header className="section-heading cart-header">
            <p>Jouw bestelling</p>
            <h2>Winkelmand</h2>
          </header>

          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Je winkelmand is nog leeg.</p>
              <Link href="/pizzas" className="btn-primary cart-empty-link">
                Bekijk pizza's
              </Link>
            </div>
          ) : (
            <>
              <div className="cart-list">
                {items.map((item) => (
                  <article key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image || "/images/pizzas/placeholder.png"} alt={item.name} />
                    </div>

                    <div className="cart-item-body">
                      <div className="cart-item-topline">
                        <h3>{item.name}</h3>
                        <button type="button" className="remove-button" onClick={() => removeItem(item.id)}>
                          Verwijderen
                        </button>
                      </div>

                      <p><strong>Grootte:</strong> {item.size}</p>
                      {item.extras.length > 0 ? <p><strong>Extras:</strong> {item.extras.join(", ")}</p> : null}
                      {item.drink ? <p><strong>Drank:</strong> {item.drink}</p> : null}

                      <div className="cart-item-actions">
                        <div className="quantity-row small">
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>

                        <strong>€{(item.unitPrice * item.quantity).toFixed(2)}</strong>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="cart-summary">
                <h3>Samenvatting</h3>

                <div className="delivery-grid">
                  <label className="customer-field">
                    <span>Naam klant</span>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(event) => setCustomerName(event.target.value)}
                      placeholder="Bijv. Anna"
                    />
                  </label>

                  <label className="customer-field">
                    <span>Telefoon</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      placeholder="0612345678"
                    />
                  </label>

                  <label className="customer-field full-width">
                    <span>Adres</span>
                    <input
                      type="text"
                      value={address}
                      onChange={(event) => setAddress(event.target.value)}
                      placeholder="Straatnaam 12"
                    />
                  </label>

                  <label className="customer-field">
                    <span>Postcode</span>
                    <input
                      type="text"
                      value={postcode}
                      onChange={(event) => setPostcode(event.target.value)}
                      placeholder="1234 AB"
                    />
                  </label>

                  <label className="customer-field full-width">
                    <span>Opmerking</span>
                    <textarea
                      value={note}
                      onChange={(event) => setNote(event.target.value)}
                      rows={3}
                      placeholder="Bijv. geen uien, extra saus"
                    />
                  </label>
                </div>

                {error ? <p className="error cart-error">{error}</p> : null}

                <div className="summary-row">
                  <span>Subtotaal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="summary-row total-row">
                  <span>Totaal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <button type="button" className="btn-primary full-width" onClick={handleOrder}>
                  Bestellen
                </button>
              </aside>
            </>
          )}
        </div>
      </main>
    </>
  );
}
