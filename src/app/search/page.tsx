"use client";
import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";
export default function SearchPage(){const[q,setQ]=useState("");const found=products.filter(p=>(p.name+p.category).toLowerCase().includes(q.toLowerCase()));return <div className="design-search"><input autoFocus value={q} onChange={e=>setQ(e.target.value)} placeholder="Search for e-bikes, accessories..."/>{q&&found.length===0?<div className="no-results">No search results found</div>:<><h3>↻ Recent searches</h3><div className="search-items">{products.slice(0,3).map(p=><Link href={`/bikes/${p.slug}`} key={p.slug}><img src={p.image} alt={p.name}/><span>{p.name}</span></Link>)}</div><h3>⌁ Trending searches</h3><div className="search-items">{products.slice(0,3).map(p=><Link href={`/bikes/${p.slug}`} key={p.slug}><img src={p.image} alt={p.name}/><span>{p.name}</span></Link>)}</div></>}</div>}
