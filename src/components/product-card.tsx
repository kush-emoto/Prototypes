import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/data/products";

export function ProductCard({ product, market = "IN" }: { product: Product; market?: "IN" | "ES" }) {
  return (
    <article className="product-card">
      <Link href={`/bikes/${product.slug}`} className="product-image">
        {product.badge && <span className="badge">{product.badge}</span>}
        <img src={product.image} alt={product.name} />
      </Link>
      <div className="product-body">
        <p className="eyebrow">{product.category}</p>
        <h3>{product.name}</h3>
        <div className="spec-row"><span>{product.range} range</span><span>{product.motor} motor</span></div>
        <p className="price">{formatPrice(product.price, market)} {product.compareAt && <del>{formatPrice(product.compareAt, market)}</del>}</p>
        <Link className="button dark full" href={`/bikes/${product.slug}`}>View bike</Link>
      </div>
    </article>
  );
}
