import { NextResponse } from "next/server";
export async function GET() { return NextResponse.json({ data: ["10:00-12:00", "12:00-14:00", "16:00-18:00"], timezone: "Asia/Kolkata" }); }
