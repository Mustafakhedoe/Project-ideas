import Link from "next/link";

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
          <Link href="/contact">Contact</Link>
        </li>

        <li>
          <Link href="/login">Inloggen</Link>
        </li>
      </ul>
    </nav>
  );
}