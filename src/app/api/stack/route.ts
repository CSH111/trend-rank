import { getStacks } from "@/serverActions";
import { NextResponse, NextRequest } from "next/server";

// To handle a GET request to /api
export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search");
  if (!search) {
    return NextResponse.json({ message: "need param" }, { status: 400 });
  }

  const rankData = await getStacks(search);
  return NextResponse.json(rankData, { status: 200 });
}
