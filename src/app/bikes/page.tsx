"use client";

import Link from "next/link";
import { useState } from "react";
import { products, formatPrice } from "@/data/products";
import { useContent } from "@/context/content-context";

export default function BikesPage() {
  const [category, setCategory] = useState("All Models");
  const [filters, setFilters] = useState(true);
  const { market } = useContent();
  const shown = category === "All Models" ? products.concat(products.slice(0, 2)) : products.filter((p) => category === "Electric cycles" ? p.category !== "Fat tyre" : p.category === "Fat tyre");
  return <div className="design-listing">
    <div className="listing-tabs"><div>{["All Models","Electric cycles","Electric bikes"].map(item=><button className={category===item?"active":""} onClick={()=>setCategory(item)} key={item}>{item}</button>)}</div><button onClick={()=>setFilters(!filters)}>Filters　⌃</button></div>
    <div className="listing-wrap"><div className="listing-grid">{shown.map((p,i)=><article className="listing-card" key={`${p.slug}-${i}`}><header><h2>{p.name}</h2><div><strong>{formatPrice(p.price,market)}</strong><small>EMI from ₹2,179/month</small></div></header><div className="listing-bike"><div className="vertical-dots"><i/><i/><i/></div><img src={p.image} alt={p.name}/></div><footer><div><strong>4.8 ★</strong><small>1965 reviews</small></div><span>↟ Upto {p.range}<small>Range</small></span><span>▣ 4–5 hrs<small>Charge time</small></span></footer><div className="listing-actions"><Link href={`/bikes/${p.slug}`}>View details</Link><Link href="/cart">Buy Now</Link></div></article>)}</div>{filters&&<aside className="filter-flyout"><header>Filters <button onClick={()=>setFilters(false)}>Clear all</button></header><label>Price Range<input type="range"/></label><fieldset><legend>Rider Height</legend>{["Under 5'0\"","5'0\"–5'4\"","5'4\"–5'8\"","5'8\"–6'0\""].map(x=><label key={x}><input type="checkbox"/> {x}</label>)}</fieldset><fieldset><legend>Range</legend>{["0–50 km","50–80 km","80–100 km","100+ km"].map(x=><label key={x}><input type="checkbox"/> {x}</label>)}</fieldset></aside>}</div>
    <section className="listing-seo"><h2>List of Electric Cycle Models With Price</h2><p>EMotorad offers electric cycles across a wide price range, making them accessible to every kind of rider.</p><div>{products.concat(products).map((p,i)=><Link href={`/bikes/${p.slug}`} key={i}><span>{p.name}<b>{formatPrice(p.price,market)}</b></span><img src={p.image} alt={p.name}/></Link>)}</div></section>
  </div>;
}
