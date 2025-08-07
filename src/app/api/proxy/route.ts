// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL required" }, { status: 400 });
  }

  try {
    const response = await axios({
      method: "GET",
      url: url,
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; NextJS-Proxy/1.0)",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      timeout: 5000,
      maxRedirects: 5,
      responseType: "text",
    });

    // HTML 전체를 그대로 반환 (파싱은 클라이언트에서)
    return new NextResponse(response.data, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error: any) {
    console.error("Proxy error:", error.message);
    return NextResponse.json({ error: `Failed to fetch: ${error.message}` }, { status: 500 });
  }
}
