import Link from "next/link";
import { notFound } from "next/navigation";
import { products, formatPrice } from "@/data/products";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) notFound();
  return (
    <>
      <section className="pdp-top">
        <div className="pdp-visual"><span className="badge">{product.badge ?? product.category}</span><img src={product.image} alt={product.name}/><div className="swatches"><button aria-label="Selected colour" className="selected"/><button aria-label="Alternative colour"/><button aria-label="Alternative colour"/></div></div>
        <div className="pdp-buy"><p className="eyebrow">{product.category} e-bike</p><h1>{product.name}</h1><div className="rating">★★★★★ <span>4.8 · 126 reviews</span></div><p className="lead">{product.description}</p><p className="pdp-price">{formatPrice(product.price)} <del>{formatPrice(product.compareAt ?? product.price)}</del></p><p className="finance">EMI from ₹1,275/month · Inclusive of taxes</p><div className="buy-actions"><Link className="button lime" href="/cart">Add to cart</Link><Link className="button outline" href="/test-ride">Book a test ride</Link></div><ul className="delivery-list"><li>Free doorstep delivery</li><li>1-year comprehensive warranty</li><li>7-day easy returns</li></ul></div>
      </section>
      <section className="spec-band"><div><strong>{product.range}</strong><span>Claimed range</span></div><div><strong>{product.topSpeed}</strong><span>Top speed</span></div><div><strong>{product.motor}</strong><span>Motor</span></div><div><strong>3.5 hrs</strong><span>Charge time</span></div></section>
      <section className="pdp-story"><img src={product.banner} alt={`${product.name} ride`}/><div><p className="eyebrow light">Engineered for the everyday</p><h2>Power when you want it. Freedom when you don’t.</h2><p>Five levels of pedal assist help flatten climbs and shorten long days, while familiar cycle controls keep the ride natural.</p></div></section>
      <section className="section feature-cards"><article><span>01</span><h3>Removable battery</h3><p>Charge it on or off the bike.</p></article><article><span>02</span><h3>Confident braking</h3><p>Consistent control in daily conditions.</p></article><article><span>03</span><h3>Smart display</h3><p>Speed, distance and battery at a glance.</p></article></section>
    </>
  );
}
