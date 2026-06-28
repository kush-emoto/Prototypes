"use client";

import { FormEvent, useState } from "react";
import { products } from "@/data/products";

export default function TestRidePage() {
  const [done, setDone] = useState(false);
  function submit(event: FormEvent) { event.preventDefault(); setDone(true); }
  return <div className="form-page"><div className="form-art"><img src={products[2].banner} alt="EMotorad test ride"/><div><p className="eyebrow light">Try it yourself</p><h1>Your first electric ride starts here.</h1></div></div><section className="form-panel">{done ? <div className="success"><span>✓</span><h2>Test ride request received.</h2><p>This is a prototype confirmation. No booking was sent to a live system.</p><button className="button dark" onClick={() => setDone(false)}>Book another</button></div> : <><p className="eyebrow">Free test ride</p><h2>Choose your ride and location.</h2><form onSubmit={submit} className="stack-form"><label>Which e-bike?<select required>{products.map((product) => <option key={product.slug}>{product.name}</option>)}</select></label><label>City<select required><option>Pune</option><option>Mumbai</option><option>Bengaluru</option><option>Delhi NCR</option></select></label><div className="field-pair"><label>Date<input type="date" required/></label><label>Time<select><option>10:00–12:00</option><option>12:00–14:00</option><option>16:00–18:00</option></select></label></div><label>Full name<input required placeholder="Your name"/></label><label>Phone<input required type="tel" placeholder="+91"/></label><button className="button lime full">Request test ride</button></form></>}</section></div>;
}
