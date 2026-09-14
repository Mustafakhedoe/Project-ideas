import Link from "next/link";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/contact">Contact</Link>
      <Link href="/login">Inloggen</Link>
    </nav>
  );
}