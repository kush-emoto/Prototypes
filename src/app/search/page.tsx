"use client";
import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product-card";
export default function SearchPage() { const [query, setQuery] = useState(""); const result = products.filter((p) => `${p.name} ${p.category}`.toLowerCase().includes(query.toLowerCase())); return <div className="page-shell"><header className="search-head"><p className="eyebrow">Search EMotorad</p><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search e-bikes, support and more…"/></header><p className="catalog-meta">{query ? `${result.length} results for “${query}”` : "Popular e-bikes"}</p><div className="product-grid listing">{result.map((product) => <ProductCard key={product.slug} product={product}/>)}</div></div>; }
