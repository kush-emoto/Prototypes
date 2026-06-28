import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ data: [{ id: "pune-01", city: "Pune", name: "EMotorad Experience Centre", address: "Baner, Pune" }, { id: "blr-01", city: "Bengaluru", name: "EMotorad Partner Store", address: "Indiranagar, Bengaluru" }] }); }
