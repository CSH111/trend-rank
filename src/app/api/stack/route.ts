import { getStacks } from "@/serverActions";
import { NextResponse, NextRequest } from "next/server";

/**
 * @swagger
 * /api/stack:
 *   get:
 *     summary: 기술 스택 검색
 *     description: 검색어를 기반으로 기술 스택 데이터를 조회합니다.
 *     tags: [Stack]
 *     parameters:
 *       - in: query
 *         name: search
 *         required: true
 *         schema:
 *           type: string
 *         description: 검색할 기술 스택명
 *         example: "javascript"
 *     responses:
 *       200:
 *         description: 기술 스택 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   description: 기술 스택 데이터 배열
 *       400:
 *         description: 필수 파라미터 누락
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "need param"
 */
export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get("search");
  if (!search) {
    return NextResponse.json({ message: "need param" }, { status: 400 });
  }

  const rankData = await getStacks(search);
  return NextResponse.json(rankData, { status: 200 });
}
