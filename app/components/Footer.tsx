const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Menu", href: "/pizzas" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" },
  { label: "Winkelmand", href: "/cart" },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand-block">
          <div className="footer-brand">Sopranos Pizza</div>
          <p className="footer-tagline">Verse pizza, thuisbezorgd met smaak.</p>
        </div>

        <nav className="footer-links" aria-label="Footer navigatie">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-contact">
          <p>Via Roma 24, Amsterdam</p>
          <p>020 - 555 0142</p>
          <p>hello@sopranos.nl</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 Sopranos Pizza. Alle rechten voorbehouden.</p>
      </div>
    </footer>
  );
}
