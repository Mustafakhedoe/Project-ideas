import Link from "next/link";
import CartBadge from "@/app/components/CartBadge";

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="logo">
        Sopranos Pizza
      </Link>

      <ul className="nav-links">
        <li>
          <Link href="/">Home</Link>
        </li>

        <li>
          <Link href="/pizzas">Pizzas</Link>
        </li>

        <li>
          <Link href="/producten?category=drank">Dranken</Link>
        </li>

        <li>
          <Link href="/producten?category=ijs">IJs</Link>
        </li>

        <li>
          <Link href="/contact">Contact</Link>
        </li>

        <li>
          <Link href="/login">Inloggen</Link>
        </li>

        <li>
          <CartBadge />
        </li>
      </ul>
    </nav>
  );
}