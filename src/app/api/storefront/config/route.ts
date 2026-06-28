import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ markets: ["IN", "ES"], defaultMarket: "IN", currencies: { IN: "INR", ES: "EUR" }, features: { checkout: "mock", testRide: true, cms: "browser-local" } }); }
