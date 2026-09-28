"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readCart } from "@/app/lib/cart";

export default function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readCart().reduce((total, item) => total + item.quantity, 0));
    sync();

    const handleStorage = () => sync();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  return (
    <Link href="/cart" className="cart-link" aria-label="Winkelmand bekijken">
      Winkelmand
      {count > 0 ? <span className="cart-count">{count}</span> : null}
    </Link>
  );
}
