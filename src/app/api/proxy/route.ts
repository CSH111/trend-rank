// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

/**
 * @swagger
 * /api/proxy:
 *   get:
 *     summary: 웹 페이지 프록시
 *     description: 외부 URL을 프록시하여 HTML 콘텐츠를 반환합니다.
 *     tags: [Proxy]
 *     parameters:
 *       - in: query
 *         name: url
 *         required: true
 *         schema:
 *           type: string
 *         description: 프록시할 외부 URL
 *         example: "https://example.com"
 *     responses:
 *       200:
 *         description: HTML 콘텐츠 반환 성공
 *         content:
 *           text/html:
 *             schema:
 *               type: string
 *               description: HTML 콘텐츠
 *       400:
 *         description: 필수 파라미터 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "URL required"
 *       500:
 *         description: 프록시 요청 실패
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch: Network error"
 */
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
