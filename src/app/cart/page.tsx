"use client";

import { useState } from "react";
import Link from "next/link";
import { products, formatPrice } from "@/data/products";

export default function CartPage() {
  const product = products[1];
  const [quantity, setQuantity] = useState(1);
  return <div className="page-shell narrow"><header className="page-intro"><p className="eyebrow">Your cart</p><h1>One step closer to the ride.</h1></header><div className="cart-layout"><section className="cart-item"><img src={product.image} alt={product.name}/><div><h2>{product.name}</h2><p>Graphite · Standard</p><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button><span>{quantity}</span><button onClick={() => setQuantity(quantity + 1)}>+</button></div></div><strong>{formatPrice(product.price * quantity)}</strong></section><aside className="summary"><h2>Order summary</h2><p><span>Subtotal</span><strong>{formatPrice(product.price * quantity)}</strong></p><p><span>Delivery</span><strong>Free</strong></p><hr/><p className="total"><span>Total</span><strong>{formatPrice(product.price * quantity)}</strong></p><button className="button lime full">Proceed to checkout</button><Link href="/bikes">Continue shopping</Link><small>Checkout is illustrative in this prototype. No payment will be taken.</small></aside></div></div>;
}
