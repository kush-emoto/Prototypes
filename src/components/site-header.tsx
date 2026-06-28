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
          <Link href="/bikes">Bikes</Link>
          <Link href="/bikes">Accessories</Link>
          <Link href="/test-ride">Book a Test Ride</Link>
          <Link href="/test-ride">Store Locator</Link>
          <Link href="#about">About Us</Link>
          <Link href="#support">Support</Link>
          <Link className="nav-icon" href="/search" aria-label="Search">⌕</Link>
          <Link className="nav-icon" href="/account" aria-label="Account">♙</Link>
          <Link className="nav-icon" href="/cart" aria-label="Cart">🛒</Link>
          <Link className="login-pill" href="/login">Log In</Link>
          <select value={market} onChange={(event) => setMarket(event.target.value as "IN" | "ES")} aria-label="Market">
            <option value="IN">India</option>
            <option value="ES">España</option>
          </select>
        </nav>
      </header>
    </>
  );
}
