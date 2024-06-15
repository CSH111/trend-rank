import { getRank } from "@/serverActions";
import { NextResponse, NextRequest } from "next/server";

// To handle a GET request to /api
export async function GET(req: NextRequest) {
  const group = req.nextUrl.searchParams.get("group");
  const page = req.nextUrl.searchParams.get("page");
  if (!group || !page) {
    return NextResponse.json({ message: "need param" }, { status: 400 });
  }
  const rankData = await getRank(
    group.split(",").map((g) => +g),
    +page
  );
  return NextResponse.json(rankData, { status: 200 });
}
