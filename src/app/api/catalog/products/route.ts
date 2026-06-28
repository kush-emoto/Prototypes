import { NextResponse } from "next/server";
import { products } from "@/data/products";
export async function GET() { return NextResponse.json({ data: products, meta: { total: products.length, source: "prototype-catalogue" } }); }
