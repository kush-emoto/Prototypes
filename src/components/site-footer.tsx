import Link from "next/link";

export function SiteFooter() {
  return (
    <><section className="global-join"><h2>Come, join the Electric Revolution</h2><p>Try an e-cycle for free. No strings attached. Just show up and ride.</p><div><Link href="/test-ride">Book Free Test Ride</Link><a href="https://wa.me/">Talk to Us on WhatsApp</a></div></section><footer className="footer">
      <div>
        <img src="/emotorad-logo.png" alt="EMotorad" />
        <p>Move different.</p>
      </div>
      <div><strong>Explore</strong><Link href="/bikes">All e-bikes</Link><Link href="/test-ride">Book a test ride</Link></div>
      <div><strong>Support</strong><a href="#">Contact</a><a href="#">Warranty</a><a href="#">Owner manuals</a></div>
      <div><strong>Company</strong><Link href="/studio">Content Studio</Link><span>India · España</span><a href="#">Instagram</a><a href="#">LinkedIn</a></div>
      <small>© {new Date().getFullYear()} EMotorad. Stakeholder prototype.</small>
    </footer></>
  );
}
