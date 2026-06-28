"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { products, formatPrice } from "@/data/products";
import { useContent } from "@/context/content-context";

export default function BikesPage() {
  const [category, setCategory] = useState("All Models");
  const [filters, setFilters] = useState(false);
  const { market } = useContent();
  const shown = category === "All Models" ? products.concat(products.slice(0, 2)) : products.filter((p) => category === "Electric cycles" ? p.category !== "Fat tyre" : p.category === "Fat tyre");
  useEffect(() => {
    const close = (event: KeyboardEvent) => event.key === "Escape" && setFilters(false);
    document.body.classList.toggle("filters-open", filters);
    window.addEventListener("keydown", close);
    return () => { document.body.classList.remove("filters-open"); window.removeEventListener("keydown", close); };
  }, [filters]);
  return <div className="design-listing">
    <div className="listing-tabs"><div>{["All Models","Electric cycles","Electric bikes"].map(item=><button className={category===item?"active":""} onClick={()=>{setCategory(item);setFilters(false)}} key={item}>{item}</button>)}</div><button aria-expanded={filters} aria-controls="catalogue-filters" data-testid="filter-trigger" onClick={()=>setFilters(true)}>Filters　⌄</button></div>
    <div className="listing-wrap"><div className="listing-grid">{shown.map((p,i)=><article className="listing-card" key={`${p.slug}-${i}`}><header><h2>{p.name}</h2><div><strong>{formatPrice(p.price,market)}</strong><small>EMI from ₹2,179/month</small></div></header><div className="listing-bike"><div className="vertical-dots"><i/><i/><i/></div><img src={p.image} alt={p.name}/></div><footer><div><strong>4.8 ★</strong><small>1965 reviews</small></div><span>↟ Upto {p.range}<small>Range</small></span><span>▣ 4–5 hrs<small>Charge time</small></span></footer><div className="listing-actions"><Link href={`/bikes/${p.slug}`}>View details</Link><Link href="/cart">Buy Now</Link></div></article>)}</div></div>
    {filters&&<><button className="filter-backdrop" aria-label="Close filters" onClick={()=>setFilters(false)}/><aside id="catalogue-filters" className="filter-flyout" role="dialog" aria-modal="true" aria-label="Catalogue filters"><header><span>Filters</span><button aria-label="Close filters" onClick={()=>setFilters(false)}>×</button></header><button className="clear-filters">Clear all</button><label>Price Range<input type="range"/></label><fieldset><legend>Rider Height</legend>{["Under 5'0\"","5'0\"–5'4\"","5'4\"–5'8\"","5'8\"–6'0\""].map(x=><label key={x}><input type="checkbox"/> {x}</label>)}</fieldset><fieldset><legend>Range</legend>{["0–50 km","50–80 km","80–100 km","100+ km"].map(x=><label key={x}><input type="checkbox"/> {x}</label>)}</fieldset><button className="apply-filters" onClick={()=>setFilters(false)}>Show {shown.length} models</button></aside></>}
    <section className="listing-seo"><h2>List of Electric Cycle Models With Price</h2><p>EMotorad offers electric cycles across a wide price range, making them accessible to every kind of rider.</p><div>{products.concat(products).map((p,i)=><Link href={`/bikes/${p.slug}`} key={i}><span>{p.name}<b>{formatPrice(p.price,market)}</b></span><img src={p.image} alt={p.name}/></Link>)}</div></section>
  </div>;
}
