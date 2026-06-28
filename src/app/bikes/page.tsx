"use client";

import { useState } from "react";
import { ProductCard } from "@/components/product-card";
import { products } from "@/data/products";
import { useContent } from "@/context/content-context";

export default function BikesPage() {
  const [category, setCategory] = useState("All");
  const { market } = useContent();
  const categories = ["All", ...new Set(products.map((product) => product.category))];
  const shown = category === "All" ? products : products.filter((product) => product.category === category);
  return (
    <div className="page-shell">
      <header className="page-intro"><p className="eyebrow">EMotorad e-bikes</p><h1>Choose your kind of electric.</h1><p>Compare styles, range and ride position to find the bike that fits your day.</p></header>
      <div className="catalog-layout">
        <aside className="filters"><strong>Ride style</strong>{categories.map((item) => <button className={item === category ? "active" : ""} key={item} onClick={() => setCategory(item)}>{item}</button>)}</aside>
        <section><div className="catalog-meta"><span>{shown.length} e-bikes</span><select aria-label="Sort products"><option>Featured</option><option>Price: low to high</option><option>Range</option></select></div><div className="product-grid listing">{shown.map((product) => <ProductCard key={product.slug} product={product} market={market}/>)}</div></section>
      </div>
    </div>
  );
}
