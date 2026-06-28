"use client";

import Link from "next/link";
import { useState } from "react";
import { useContent } from "@/context/content-context";

export function SiteHeader() {
  const { content, market, setMarket } = useContent();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="announcement">{content.announcement}</div>
      <header className="site-header">
        <Link className="brand" href="/" aria-label="EMotorad home">
          <img src="/emotorad-logo.png" alt="EMotorad" />
        </Link>
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">☰</button>
        <nav className={open ? "nav open" : "nav"}>
          <Link href="/bikes">E-bikes</Link>
          <Link href="/test-ride">Test ride</Link>
          <Link href="/search">Search</Link>
          <Link href="/account">Account</Link>
          <Link href="/cart">Cart</Link>
          <select value={market} onChange={(event) => setMarket(event.target.value as "IN" | "ES")} aria-label="Market">
            <option value="IN">India</option>
            <option value="ES">España</option>
          </select>
          <Link className="studio-link" href="/studio">CMS demo</Link>
        </nav>
      </header>
    </>
  );
}
