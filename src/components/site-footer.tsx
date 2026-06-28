import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div>
        <img src="/emotorad-logo.png" alt="EMotorad" />
        <p>Move different.</p>
      </div>
      <div><strong>Explore</strong><Link href="/bikes">All e-bikes</Link><Link href="/test-ride">Book a test ride</Link></div>
      <div><strong>Support</strong><a href="#">Contact</a><a href="#">Warranty</a><a href="#">Owner manuals</a></div>
      <div><strong>Prototype</strong><Link href="/studio">CMS demo</Link><span>India · España</span></div>
      <small>© {new Date().getFullYear()} EMotorad. Stakeholder prototype.</small>
    </footer>
  );
}
