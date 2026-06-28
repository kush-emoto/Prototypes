"use client";

import Link from "next/link";
import { useContent } from "@/context/content-context";
import { products } from "@/data/products";
import { ProductCard } from "./product-card";

const benefits = [
  ["01", "Up to 60+ km", "Enough range for the commute and the scenic route home."],
  ["02", "Pan-India support", "Service and ownership support that stays close to the rider."],
  ["03", "Built for real roads", "Frames, tyres and assistance tuned for everyday conditions."],
  ["04", "Easy ownership", "Simple delivery, EMI and test-ride journeys from one platform."],
];

export function HomePage() {
  const { content, market } = useContent();
  return (
    <>
      <section className="hero">
        {content.hero.mediaType === "video" ? (
          <video src={content.hero.mediaUrl} autoPlay muted loop playsInline />
        ) : (
          <img src={content.hero.mediaUrl} alt="EMotorad ride" />
        )}
        <div className="hero-shade" />
        <div className="hero-copy">
          <p className="eyebrow light">{content.hero.eyebrow}</p>
          <h1>{content.hero.title}</h1>
          <p>{content.hero.subtitle}</p>
          <Link className="button lime" href={content.hero.ctaHref}>{content.hero.ctaLabel}</Link>
        </div>
      </section>

      {content.enabledSections.products && <section className="section product-section">
        <div className="section-heading"><div><p className="eyebrow">Find your ride</p><h2>Built for wherever you go</h2></div><Link href="/bikes">View all →</Link></div>
        <div className="product-grid">{products.slice(0, 3).map((product) => <ProductCard key={product.slug} product={product} market={market} />)}</div>
      </section>}

      {content.enabledSections.intro && <section className="statement section">
        <p className="eyebrow">Why electric</p><h2>{content.intro.title}</h2><p>{content.intro.body}</p>
        <div className="route-line">EMOTORAD <span>●</span> WORK <span>●</span> WEEKEND <span>●</span> EVERYWHERE</div>
      </section>}

      <section className="split-feature">
        <div><p className="eyebrow light">Test before you choose</p><h2>Meet your next ride in person.</h2><Link className="button lime" href="/test-ride">Book a free test ride</Link></div>
        <img src={products[0].banner} alt="EMotorad X1 in the city" />
      </section>

      {content.enabledSections.benefits && <section className="section benefits">
        <p className="eyebrow">The EMotorad advantage</p><h2>{content.benefitsTitle}</h2>
        <div className="benefit-grid">{benefits.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
      </section>}

      {content.enabledSections.reviews && <section className="reviews section">
        <p className="eyebrow">Rider stories</p><h2>{content.reviewsTitle}</h2>
        <blockquote>“The Doodle changed how I think about commuting. I arrive faster, without making the ride feel like a chore.”<cite>— Aditi, Pune</cite></blockquote>
      </section>}

      {content.enabledSections.newsletter && <section className="newsletter"><p className="eyebrow">Stay in the loop</p><h2>Good rides, delivered.</h2><form><input type="email" placeholder="Email address" aria-label="Email address"/><button className="button lime">Sign me up</button></form></section>}
    </>
  );
}
