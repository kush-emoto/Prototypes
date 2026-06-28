import { NextResponse } from "next/server";
import { products } from "@/data/products";
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) { const { slug } = await params; const product = products.find((item) => item.slug === slug); return product ? NextResponse.json({ data: product }) : NextResponse.json({ error: { code: "PRODUCT_NOT_FOUND", message: "Product not found" } }, { status: 404 }); }
